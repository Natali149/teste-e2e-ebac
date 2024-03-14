pipeline{
    agent any
    stages {
          stage('Clone do repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/Natali149/teste-e2e-ebac.git'
            }
        } stage('Instala as dependencias') {
            steps {
                bat 'npm install'
            }
        }
           stage('Teste') {
            steps {
             bat '''set NO_COLOR=1
             npm test'''
            }
        }
    }
}