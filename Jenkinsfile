pipeline {
    agent any

    tools {
        nodejs 'Node20' 
    }

    environment {
        IMAGE_NAME = 'gocart-app'    // Docker image name
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

        stage('Build Docker Image') {
            when {
                expression { return true }  // Set true when Docker installed
            }
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }
    }

    post {
        success {
            echo '✅ CI Pipeline Success: Test + Build + Docker stages ready'
        }
        failure {
            echo '❌ CI Pipeline Failed'
        }
    }
}
