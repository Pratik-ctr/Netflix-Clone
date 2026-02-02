pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Stage') {
            steps {
                echo 'Build completed successfully'
            }
        }

        stage('Test Stage') {
            steps {
                echo 'No unit tests configured'
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully'
        }
    }
}
