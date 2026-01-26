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

        stage('Generate HTML Report') {
            steps {
                sh 'node scripts/generate-report.js'
            }
        }

        stage('Prepare Netlify Report') {
            steps {
                sh '''
                rm -rf netlify
                mkdir -p netlify
                cp reports/html/cucumber-report.html netlify/index.html
                '''
            }
        }

        stage('Deploy to Netlify') {
            environment {
                NETLIFY_AUTH_TOKEN = credentials('NETLIFY_AUTH_TOKEN')
                NETLIFY_SITE_ID = '5d3cffd9-8aec-442d-9167-9642705d9354'
            }
            steps {
                sh '''
                npm install -g netlify-cli
                netlify deploy \
                    --dir=netlify \
                    --site=$NETLIFY_SITE_ID \
                    --auth=$NETLIFY_AUTH_TOKEN \
                    --prod
                '''
            }
        }

        
    }

    post {
        always {
            publishHTML([
                reportDir: 'reports/html',
                reportFiles: 'cucumber-report.html',
                reportName: 'Cucumber Automation Report',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: false
            ])
            archiveArtifacts artifacts: 'reports/html/*.html', allowEmptyArchive: true
            script {
                def statusColor = (status == 'SUCCESS') ? '#27ae60' : '#e74c3c'

                def emailBody = readFile('email/report-email.html')
                    .replace('${BUILD_STATUS}', currentBuild.currentResult)
                    .replace('${REPORT_URL}', 'https://tester542.netlify.app/')
                    .replace('__STATUS_COLOR__', statusColor)

                mail(
                    to: 'rizkysatrian@gmail.com,rudiismanto687@gmail.com',
                    subject: "Automation Report - ${JOB_NAME} #${BUILD_NUMBER}",
                    mimeType: 'text/html',
                    body: emailBody
                )
            }
        }

        success {
            echo '✅ Test execution SUCCESS'
        }

        failure {
            echo '❌ Test execution FAILED'
        }
    }
}



