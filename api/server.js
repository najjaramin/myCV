const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const app = express();

// --- INITIALISATION PRISMA AVEC ADAPTER (Prisma 7) ---
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// --- SÉCURITÉ (Étape 50 : Helmet) ---
app.use(helmet());
app.use(cors());
app.use(express.json());

// --- IMPORTATION DES DONNÉES ---
const profile = require('./profile');
const projects = require('./projects');
const skills = require('./skills');

// --- ROUTES DE BASE ---
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "OK", message: "API Portfolio fonctionne correctement" });
});

app.get('/api/profile', (req, res) => res.json(profile));
app.get('/api/projects', (req, res) => res.json(projects));
app.get('/api/skills', (req, res) => res.json(skills));

// --- VALIDATION ZOD (Étape 48) ---
const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("L'adresse email est invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères")
});

// --- RATE LIMITING (Étape 51) ---
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Trop de requêtes, veuillez réessayer plus tard." },
  standardHeaders: true,
  legacyHeaders: false,
});

// --- ROUTE CONTACT (Étape 46 & 54) ---
app.post('/api/contact', contactLimiter, async (req, res, next) => {
  try {
    const validatedData = contactSchema.parse(req.body);
    const newMessage = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
      },
    });
    res.status(201).json({
      success: true,
      message: "Message envoyé et enregistré dans la base de données !",
      id: newMessage.id
    });
  } catch (err) {
    if (err.name === 'ZodError' || err instanceof z.ZodError) {
      const errors = err.issues || err.errors || [];
      return res.status(400).json({
        error: "Données invalides",
        details: errors.map(e => ({
          field: e.path ? e.path.join('.') : 'unknown',
          message: e.message
        }))
      });
    }
    next(err);
  }
});

// --- GESTION CENTRALISÉE DES ERREURS (Étape 49) ---
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err.stack);
  res.status(500).json({
    error: "Une erreur interne est survenue sur le serveur.",
  });
});

// --- DÉMARRAGE ---
const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur API démarré sur le port ${PORT}`);
  });
}
module.exports = app;
