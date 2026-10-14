pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('my-cv-next') {
                    sh '/home/amin/.nvm/versions/node/v22.23.3/bin/node --version'
                    sh '/home/amin/.nvm/versions/node/v22.23.3/bin/npm --version'
                    sh '/home/amin/.nvm/versions/node/v22.23.3/bin/npm ci'
                }
            }
        }

        stage('Build Next.js') {
            steps {
                dir('my-cv-next') {
                    sh '/home/amin/.nvm/versions/node/v22.23.3/bin/npm run build'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline terminé avec succès !'
        }
        failure {
            echo 'Pipeline échoué. Consultez la console Jenkins.'
        }
    }
}

