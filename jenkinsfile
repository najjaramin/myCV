pipeline {
  agent any

  environment {
    IMAGE     = 'mini-cv'
    CONTAINER = 'mini-cv'
    PORT      = '8081'
  }

  triggers { pollSCM('H/2 * * * *') }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Vérification') {
      steps {
        sh 'test -f index.html && test -f style.css && test -f script.js'
        sh 'grep -q "<h1>" index.html'
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t $IMAGE:$BUILD_NUMBER -t $IMAGE:latest .'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker rm -f $CONTAINER || true'
        sh 'docker run -d --name $CONTAINER -p $PORT:80 --restart unless-stopped $IMAGE:latest'
      }
    }

    stage('Smoke test') {
      steps {
        sh 'sleep 2 && curl -fsS http://localhost:$PORT | grep -q "<h1>"'
      }
    }
  }

  post {
    success { echo "CV déployé sur le port ${PORT}" }
    failure { echo 'Pipeline en échec : consultez la console' }
  }
}

