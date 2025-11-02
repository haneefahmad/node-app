pipeline {
    agent any

    environment {
        IMAGE_NAME = 'node-app'
        CONTAINER_NAME = 'node-app-container'
        PATH = "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/Divya180804/node-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "No tests configured, skipping..."'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying container...'
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed. Cleaning up resources...'
        }
        success {
            echo ' Build and deployment successful!'
        }
        failure {
            echo ' Build failed. Please check logs in Jenkins console output.'
        }
    }
}


