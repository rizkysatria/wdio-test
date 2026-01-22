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

        stage('Clean reports') {
            steps {
                sh 'rm -rf reports'
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
            archiveArtifacts artifacts: 'reports/html/*.html', allowEmptyArchive: true
            mail(
                to: 'rizkysatrian@gmail.com,rudiismainto777@gmail.com',
                subject: "Jenkins Report - ${JOB_NAME} #${BUILD_NUMBER}",
                body: """
                <h2>Automation Test Result</h2>

                <p><b>Job:</b> ${JOB_NAME}</p>
                <p><b>Build:</b> #${BUILD_NUMBER}</p>
                <p><b>Status:</b> ${currentBuild.currentResult}</p>

                <p>
                    👉 <a href="${BUILD_URL}artifact/reports/html/">
                    Open Cucumber HTML Report
                    </a>
                </p>

                <br/>
                <small>Triggered by Jenkins</small>
                """,
                mimeType: 'text/html'
            )
            // emai(
            // to: 'rudiismainto687@gmail.com',
            // subject: "[Jenkins] ${JOB_NAME} #${BUILD_NUMBER} - ${currentBuild.currentResult}",
            // mimeType: 'text/html',
            // body: """
            //     <h2>Automation Test Result</h2>

            //     <p><b>Job:</b> ${JOB_NAME}</p>
            //     <p><b>Build:</b> #${BUILD_NUMBER}</p>
            //     <p><b>Status:</b> ${currentBuild.currentResult}</p>

            //     <p>
            //         👉 <a href="${BUILD_URL}artifact/reports/html/cucumber-report.html">
            //             Open Test Report
            //         </a>
            //     </p>

            //     <br/>
            //     <small>Triggered by Jenkins</small>
            // """
        // )
            // archiveArtifacts artifacts: 'reports/cucumber-report.zip'
            // emailext(
            //     subject: "Automation Result - ${currentBuild.currentResult}",
            //     body: """
            // Hi,

            // Automation sudah selesai.

            // Job   : ${env.JOB_NAME}
            // Build : #${env.BUILD_NUMBER}
            // Status: ${currentBuild.currentResult}

            // Silakan download & unzip report HTML terlampir.
            // """,
            //     to: 'rizkysatrian@gmail.com',
            //     attachmentsPattern: 'reports/cucumber-report.zip',
            //     recipientProviders: []
            // )
        }

        success {
            echo '✅ Test execution SUCCESS'
        }

        failure {
            echo '❌ Test execution FAILED'
        }
    }
}
