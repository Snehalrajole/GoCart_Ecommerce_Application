pipeline {
    agent any

    tools {
        nodejs 'Node20' 
    }

    stages {

        stage('Install Dependencies') {
            steps {
                // Install npm packages
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run automated tests
                bat 'npm test'
            }
        }

        stage('Build Project') {
            steps {
                // Build React + Vite project
                bat 'npm run build'
            }
        }
    }

    post {
        success {
            echo '✅ CI Pipeline: Dependencies Installed, Tests Passed, Build Successful'
        }
        failure {
            echo '❌ CI Pipeline Failed'
        }
    }
}
