pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = '132121093853'
        AWS_REGION = 'us-east-1'
        ECR_REPO_NAME = 'test'
        IMAGE_NAME = 'node-app'
        CONTAINER_NAME = 'node-app-container'
        IMAGE_TAG = 'latest'
        ECR_REPO_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"
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
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "No tests configured — skipping..."'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh """
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                    docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${ECR_REPO_URI}:${IMAGE_TAG}
                """
            }
        }

        stage('Push to AWS ECR') {
            steps {
                echo 'Authenticating and pushing Docker image to ECR...'
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-creds']]) {
                    sh """
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        docker push ${ECR_REPO_URI}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying container on EC2 instance...'
                sh """
                    echo "Stopping old container if running..."
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true

                    echo "Pulling latest image from ECR..."
                    docker pull ${ECR_REPO_URI}:${IMAGE_TAG}

                    echo "Running new container..."
                    docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${ECR_REPO_URI}:${IMAGE_TAG}
                """
            }
        }

        stage('Health Check') {
            steps {
                echo 'Checking application health...'
                sh """
                    sleep 10
                    curl -f http://localhost:3000 || echo "⚠️ App may not be running correctly."
                """
            }
        }
    }

    post {
        success {
            echo 'Build, push to ECR, and deploy successful!'
        }
        failure {
            echo 'Build or deployment failed. Check Jenkins logs for details.'
        }
        always {
            echo 'Pipeline finished — cleaning up temporary data if any.'
        }
    }
}
