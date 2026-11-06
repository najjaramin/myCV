pipeline {
    agent any

    environment {
        // Récupérer le SHA court du commit Git
        GIT_SHA = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        IMAGE_API = "devsecops-api:${GIT_SHA}"
        IMAGE_FRONT = "devsecops-portfolio:${GIT_SHA}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du code source...'
                // Jenkins récupère automatiquement le dépôt configuré dans le job
                checkout scm
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
    }

    post {
        success {
            echo "Pipeline réussi ! Images construites : ${IMAGE_API} et ${IMAGE_FRONT}"
        }
        failure {
            echo 'Pipeline échoué. Vérifiez les logs.'
        }
    }
}
