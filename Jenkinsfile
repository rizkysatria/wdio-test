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
    }

    post {
        always {
            // archiveArtifacts artifacts: 'reports/html/*.html', allowEmptyArchive: true
            // mail(
            //     subject: "Automation Result - ${currentBuild.currentResult}",
            //     body: """
            //         <p>Result: <b>${currentBuild.currentResult}</b></p>
            //         <p>Job: ${JOB_NAME}</p>
            //         <p>Build: #${BUILD_NUMBER}</p>
            //         <p>HTML report attached.</p>
            //     """,
            //     mimeType: 'text/html',
            //     attachmentsPattern: 'reports/html/*.html',  
            //     to: 'rizkysatrian@gmail.com'
            // )

            mail(
                to: 'rizkysatrian@gmail.com',
                subject: "Automation Result - ${currentBuild.currentResult}",
                body: """
            Job: ${env.JOB_NAME}
            Build: #${env.BUILD_NUMBER}
            Status: ${currentBuild.currentResult}

            HTML report attached.
            """,
                attachmentsPattern: 'reports/html/*.html'
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
