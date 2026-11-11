pipeline {
    agent any

    environment {
        GIT_SHA = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        IMAGE_API = "devsecops-api:${GIT_SHA}"
        IMAGE_FRONT = "devsecops-portfolio:${GIT_SHA}"
        DATABASE_URL = 'postgresql://user:pass@localhost:5432/db'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du code source...'
                checkout scm
            }
        }

        stage('Gitleaks - Scan des secrets') {
            steps {
                echo 'Scan des secrets avec Gitleaks...'
                sh 'mkdir -p reports'
                sh 'gitleaks detect --source . --no-git --config .gitleaks.toml --redact --verbose --exit-code=1 --report-format json --report-path reports/gitleaks.json'
            }
        }

        stage('Install Frontend') {
            steps {
                echo 'Installation des dépendances du frontend...'
                dir('my-cv-next') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install API') {
            steps {
                echo 'Installation des dépendances de l\'API...'
                dir('api') {
                    sh 'npm ci'
                }
            }
        }

        stage('Generate Prisma Client') {
            steps {
                echo 'Génération du client Prisma sur l\'hôte...'
                dir('api') {
                    sh 'npx prisma generate'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                echo 'Exécution des tests du frontend...'
                dir('my-cv-next') {
                    sh 'npm test'
                }
            }
        }

        stage('Test API') {
            steps {
                echo 'Exécution des tests de l\'API...'
                dir('api') {
                    sh 'npm test'
                }
            }
        }

        stage('Semgrep - SAST') {
            steps {
                echo 'Analyse SAST avec Semgrep...'
                sh 'mkdir -p reports'
                sh 'semgrep scan --config p/javascript --config p/nodejs --config p/owasp-top-ten --exclude node_modules --exclude .next --exclude reports --severity ERROR --error --metrics=off --json-output=reports/semgrep.json api my-cv-next'
            }
        }

        stage('NPM Audit - Dépendances') {
            steps {
                echo 'Contrôle des dépendances avec npm audit...'
                dir('api') {
                    sh 'npm audit --audit-level=high || true'
                }
                dir('my-cv-next') {
                    sh 'npm audit --audit-level=high || true'
                }
            }
        }

        stage('Build API Image') {
            steps {
                echo "Construction de l'image ${IMAGE_API}..."
                sh "docker build -t ${IMAGE_API} -t devsecops-api:latest ./api"
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo "Construction de l'image ${IMAGE_FRONT}..."
                sh "docker build -t ${IMAGE_FRONT} -t devsecops-portfolio:latest ./my-cv-next"
            }
        }

        stage('Verify Images') {
            steps {
                echo 'Vérification des images construites...'
                sh 'docker images | grep devsecops'
            }
        }

        stage('Trivy - Scan des images') {
            steps {
                echo 'Scan des images Docker avec Trivy...'
                sh 'trivy image --exit-code 1 --severity CRITICAL devsecops-api:latest'
                sh 'trivy image --exit-code 1 --severity CRITICAL devsecops-portfolio:latest'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
        }
        success {
            echo "Pipeline réussi ! Images construites : ${IMAGE_API} et ${IMAGE_FRONT}"
        }
        failure {
            echo 'Pipeline échoué. Vérifiez les logs.'
        }
    }
}
