pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Failing Stage') {
            steps {
                sh 'exit 1'
            }
        }
    }
}
