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
                mkdir -p netlify
                cp reports/html/cucumber-report.html netlify/index.html
                '''
            }
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
            mail(
  to: 'rizkysatrian@gmail.com,rudiismanto687@gmail.com',
  subject: "Jenkins Report - ${JOB_NAME} #${BUILD_NUMBER}",
  mimeType: 'text/html',
  body: """
    <h2>Automation Test Result</h2>
    <p><b>Status:</b> ${currentBuild.currentResult}</p>

    <p>
      👉 <a href="https://your-site.netlify.app">
        Open Cucumber Automation Report
      </a>
    </p>
  """
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



