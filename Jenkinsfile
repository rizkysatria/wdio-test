pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    environment {
        NODE_ENV = 'test'
    }

    parameters {
        string(
            name: 'TEST_TAGS',
            defaultValue: '',
            description: 'WAJIB isi test tags (contoh: @smoke, @login and not @wip)'
        )
    }

    stages {

        stage('Validate Parameters') {
            steps {
                script {
                if (!params.TEST_TAGS?.trim()) {
                    error("""
            ❌ TEST_TAGS tidak boleh kosong!

            Contoh valid:
            - @smoke
            - @login
            - @smoke and not @wip
            - @regression or @critical
                    """)
                }
                }
            }
        }

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
                sh """
                echo "Running tests with tags: ${params.TEST_TAGS}"
                npx wdio run wdio.conf.ts \
                    --cucumberOpts.tagExpression="${params.TEST_TAGS}"
                """
            }
        }

        stage('Generate HTML Report') {
            steps {
                sh 'node scripts/generate-report.js'
            }
        }

        stage('Prepare and Deploy Netlify Report') {
            environment {
                NETLIFY_AUTH_TOKEN = credentials('NETLIFY_AUTH_TOKEN')
                NETLIFY_SITE_ID = '5d3cffd9-8aec-442d-9167-9642705d9354'
            }

            steps {
                sh '''
                rm -rf netlify
                mkdir -p netlify
                cp reports/html/cucumber-report.html netlify/index.html
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
                def emailBody = readFile('email/report-email.html')
                .replace('${JOB_NAME}', env.JOB_NAME)
                .replace('${BUILD_NUMBER}', env.BUILD_NUMBER)
                .replace('${BUILD_TIME}', new Date().toString())
                .replace('${REPORT_URL}', 'https://tester542.netlify.app')

                mail(
                    to: 'rizkysatrian@gmail.com',
                    subject: "Automation Report - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
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



