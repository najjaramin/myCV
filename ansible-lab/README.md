# Exercice 26 : Ansible inventory et test de communication

## Objectif

Créer un fichier `inventory` contenant l'adresse IP du serveur Ubuntu cible, puis tester la communication avec :

```bash
ansible all -m ping
```

## Environnement

| Machine | Rôle | Adresse IP |
|---|---|---|
| `server` | Nœud de contrôle (Ansible) | 192.168.30.167 |
| `master` | Serveur Ubuntu cible | 192.168.30.172 |

## Fichiers

- `inventory.ini` / `inventory` : inventaire Ansible
- `ansible.cfg` : configuration d'Ansible
- `install-packages.yml` : playbook d'installation de `curl` et `git`

## Inventory

```ini
[targets]
master ansible_host=192.168.30.172 ansible_user=master
```

## Configuration (`ansible.cfg`)

```ini
[defaults]
inventory = inventory.ini

[privilege_escalation]
become_flags = -H -S

[ssh_connection]
ssh_args = -o ControlMaster=auto -o ControlPersist=60s
```

## Authentification SSH par clé

```bash
ssh-keygen -t ed25519
ssh-copy-id master@192.168.30.172
ssh master@192.168.30.172
```

La connexion s'effectue sans mot de passe.

## Commandes

```bash
# Test avec le fichier inventory
ansible all -i inventory -m ping

# Avec ansible.cfg (inventory.ini par défaut)
ansible all -m ping

# Lister les hôtes et l'inventaire
ansible all --list-hosts
ansible-inventory --list

# Playbook
ansible-playbook install-packages.yml
```

## Résultat attendu

```text
master | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

Le playbook retourne `ok=2 changed=0 failed=0` (curl et git sont déjà installés, le playbook est idempotent).

## Captures d'écran

### 1. Inventory (hôtes et inventaire)
![Inventory](screenshots/Act3/01-inventory.png)

### 2. `ansible all -m ping`
![Ansible ping](screenshots/Act3/02-ansible-ping.png)

### 3. Playbook `install-packages.yml`
![Playbook](screenshots/Act3/03-playbook.png)

### 4. Connexion SSH par clé
![SSH key](screenshots/Act3/04-ssh-key.png)

## Auteur

Amin Najjar
