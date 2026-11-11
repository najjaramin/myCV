pipeline {
    agent any
    options { timeout(time: 120, unit: 'MINUTES') }

    environment {
        GIT_SHA = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        IMAGE_API = "devsecops-api:${GIT_SHA}"
        IMAGE_FRONT = "devsecops-portfolio:${GIT_SHA}"
        DATABASE_URL = 'postgresql://user:pass@localhost:5432/db'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'git@github.com:najjaramin/myCV.git', branch: 'main'
            }
        }

        stage('Gitleaks - Scan des secrets') {
            steps {
                sh 'mkdir -p reports'
                sh 'gitleaks detect --source . --no-git --config .gitleaks.toml --redact --verbose --exit-code=1 --report-format json --report-path reports/gitleaks.json'
            }
        }

        stage('Install Frontend') {
            steps {
                dir('my-cv-next') { 
                    sh '''
                        npm config set fetch-retries 5
                        npm ci
                    ''' 
                }
            }
        }

        stage('Install API') {
            steps {
                dir('api') { 
                    sh '''
                        npm config set fetch-retries 5
                        npm ci
                    ''' 
                }
            }
        }

        stage('Generate Prisma Client') {
            steps { dir('api') { sh 'npx prisma generate' } }
        }

        stage('Test Frontend') {
            steps { dir('my-cv-next') { sh 'npm test' } }
        }

        stage('Test API') {
            steps { dir('api') { sh 'npm test' } }
        }

        stage('Semgrep - SAST') {
            steps {
                sh 'semgrep scan --config p/javascript --config p/nodejs --config p/owasp-top-ten --exclude node_modules --exclude .next --exclude reports --severity ERROR --error --metrics=off --json-output=reports/semgrep.json api my-cv-next'
            }
        }

        stage('NPM Audit') {
            steps {
                dir('api') { sh 'npm audit --audit-level=high || true' }
                dir('my-cv-next') { sh 'npm audit --audit-level=high || true' }
            }
        }

        stage('Build API Image') {
            steps { sh "docker build -t ${IMAGE_API} -t devsecops-api:latest ./api" }
        }

        stage('Build Frontend Image') {
            steps { sh "docker build -t ${IMAGE_FRONT} -t devsecops-portfolio:latest ./my-cv-next" }
        }

        stage('Trivy - Scan des images') {
            steps {
                echo "=== Controle bloquant CRITICAL : API ==="
                sh 'trivy image --no-progress --scanners vuln --ignore-unfixed --severity CRITICAL --exit-code 1 "$IMAGE_API"'
                echo "=== Controle bloquant CRITICAL : FRONTEND ==="
                sh 'trivy image --no-progress --scanners vuln --ignore-unfixed --severity CRITICAL --exit-code 1 "$IMAGE_FRONT"'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
        }
        failure {
            echo 'Pipeline échoué : vérifiez les logs.'
        }
    }
}
