pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    environment {
        NODE_ENV = 'test'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    node -v
                    npm -v
                    npm ci
                '''
            }
        }

        stage('Run WDIO Tests') {
            steps {
                sh '''
                    npx wdio run wdio.conf.ts
                '''
            }
        }
    }

    post {
        always {
            echo 'Automation pipeline finished'

            // kalau nanti ada report folder
            archiveArtifacts artifacts: '**/reports/**', allowEmptyArchive: true
        }

        success {
            echo '✅ Test execution SUCCESS'
        }

        failure {
            echo '❌ Test execution FAILED'
        }
    }
}
