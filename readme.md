# Système de Messagerie avec RabbitMQ

Groupe 7

- Thierry Pavone TCHOUAMOU PAYONG
- Paul-Henry NGANKAM NGOUNOU

## Description

Ce projet implémente un système de messagerie asynchrone utilisant RabbitMQ comme broker de messages. Pour ce projet nous avons utilisé Typescript, AdonisJS pour le backend et React pour le frontend.

### Backend avec AdonisJS

Le backend de notre application est développé avec AdonisJS, un framework Node.js puissant et extensible. AdonisJS suit une architecture MVC (Model-View-Controller), facilitant la gestion des différentes parties de l'application. Il offre une structure claire et des outils robustes pour la gestion des requêtes HTTP, des authentifications, et bien plus encore. Dans ce projet, AdonisJS est utilisé pour créer des API RESTful permettant aux producteurs et consommateurs de communiquer avec RabbitMQ.

### Frontend avec React (socket.io)

Le frontend est développé avec React, une bibliothèque JavaScript populaire pour la construction d'interfaces utilisateur dynamiques. React suit une architecture basée sur des composants, permettant de créer des interfaces réactives et modulaires. Dans ce projet, React est utilisé pour développer une interface utilisateur qui interagit avec le backend AdonisJS, offrant une visualisation en temps réel des messages envoyés et reçus. De plus, nous utilisons Socket.IO pour gérer les notifications en temps réel, assurant que les utilisateurs sont immédiatement informés des nouveaux messages et des mises à jour importantes.

![alt text](<Architecture Globale.png>)

Ce schéma met en évidence la séparation des responsabilités entre les différentes couches de l'application : le frontend (React), le backend (AdonisJS) et le système de messagerie asynchrone (RabbitMQ). Cette architecture modulaire et bien définie permet de développer une application de messagerie robuste et maintenable.

## Prérequis

- Docker
- Node.js v20.14.0
- RabbitMQ

## Installation

1. Cloner le dépôt

   ```bash
       git clone https://github.com/Paul-HenryN/projet-rabbitmq-groupe-7.git
       cd projet-rabbitmq-groupe-7
   ```

2. Installer les dépendances

   ```bash
       npm install
   ```

3. Configurer l'environnement

   Renommer .env.example en .env et configurer les variables d'environnement nécessaires.

4. Lancer les migrations

   ```bash
       node ace migration:run
   ```

5. Lancer Docker pour RabbitMQ

   ```bash
       docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13-management
   ```

6. Lancer l'application

   Le backend avec :

   ```bash
       node ace serve
   ```

   Le frontend avec :

   ```bash
       npm run start
   ```

## Utilisation

Dans cette application, les utilisateurs interagissent avec l'interface utilisateur React. Pour commencer, les utilisateurs doivent se connecter ou s'inscrire s'ils ne sont pas encore enregistrés. Une fois connectés, ils peuvent envoyer des messages. Le backend, agissant en tant que producteur, crée et envoie des messages à RabbitMQ via des échanges. RabbitMQ utilise ces échanges pour diriger les messages entrants vers les files d'attente appropriées en fonction des clés de routage définies, où ils sont stockés jusqu'à leur récupération par les consommateurs. Les consommateurs du backend AdonisJS se connectent aux files d'attente de RabbitMQ, récupèrent et traitent les messages, puis renvoient les résultats du traitement à l'interface utilisateur grâce à socket.io.
