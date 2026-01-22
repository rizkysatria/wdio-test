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

        stage('Debug Report Files') {
            steps {
                sh 'ls -R reports'
            }
        }

        stage('Generate HTML Report') {
            steps {
                sh 'node scripts/generate-report.js'
            }
        }

        stage('Zip HTML Report') {
            steps {
                sh '''
                cd reports
                zip -r cucumber-report.zip html
                '''
            }
        }
    }

    post {
        always {
            // publishHTML([
            //     reportDir: 'reports/html',
            //     reportFiles: 'cucumber-report.html',
            //     reportName: 'Cucumber Automation Report',
            //     keepAll: true,
            //     alwaysLinkToLastBuild: true,
            //     allowMissing: false
            // ])
            // mail(
            //             to: 'rizkysatrian@gmail.com',
            //             subject: "Automation Result - ${currentBuild.currentResult}",
            //             body: """
            //             Job       : ${env.JOB_NAME}
            //             Build     : #${env.BUILD_NUMBER}
            //             Status    : ${currentBuild.currentResult}

            //             Report:
            //             ${env.BUILD_URL}artifact/reports/html/
            //             """
            // )

            emailext(
                subject: "Automation Result - ${currentBuild.currentResult}",
                body: """
            Hi,

            Automation sudah selesai.

            Job   : ${env.JOB_NAME}
            Build : #${env.BUILD_NUMBER}
            Status: ${currentBuild.currentResult}

            Silakan download & unzip report HTML terlampir.
            """,
                to: 'rizkysatrian@gmail.com',
                from: 'Jenkins CI <rizkysatrian@gmail.com>',
                attachmentsPattern: 'reports/cucumber-report.zip',
                recipientProviders: []
            )
        }

        success {
            echo '✅ Test execution SUCCESS'
        }

        failure {
            echo '❌ Test execution FAILED'
        }
    }
}
