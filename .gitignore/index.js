const Discord = require('discord.js') 
const bot = new Discord.Client() 


    var name = "Find Your Mates";
    //  ID = 463263697297735691
    //https://discordapp.com/oauth2/authorize?client_id=463263697297735691&scope=bot&permissions=3072
    const Prefix = "!";
    var fs = require("fs");
    var fichier;
    var nameSend;
    var nameServ;
    var agebc ="test";
    var nb = 1;
    var phraseJoueur = "Voici la liste des joueurs correspondant à votre demande \n";
    var phraseScrim  = "Voici la liste des teams correspondant à votre demande \n";
    var champ = "\n";
    

    bot.on('ready',function(){
        bot.user.setActivity("!help", { type: 'LISTENING' })

        bot.user.setAvatar('skin.png')
        .then(user => console.log(`New avatar set!`))
        .catch(console.error);

        bot.user.setUsername(name)
        .then(user => console.log(`My new username is ${user.username}`))
        .catch(console.error);
    })

//////////////////////////////////////////////////////////////////////////send erreur//////////////////////////////////////////////////////////////////////////////////////
    function sendError(message,description){
        message.channel.send( description);
    }

//////////////////////////////////////////////////////////////////////////function split playeur//////////////////////////////////////////////////////////////////////////////////////
    function splitJoueur(message,joueur,elo,lane) {
        agebc = agebc + joueur;
        let dce = agebc.split(';');

        while (dce[nb] != undefined){
            let joueur = dce[nb].split('#');
            if (elo === joueur[1] || elo === "all"){
                if (lane === joueur[2] || lane === "all"){
                    champ = champ +"**Nom de champion:** " + joueur[0] +"\n**Elo:** " + joueur[1] + "\n**Lane:** " + joueur[2] + "\n\n" ;
                }
            }
            nb ++;
        }
        if (champ === "\n"){
            message.channel.send("aucun joueur trouvé pour ces critères");
        }
        else{
        nb = 1;
        phraseJoueur = phraseJoueur + champ ;
        message.channel.send(phraseJoueur);
        }

        phraseJoueur = "Voici la liste des joueurs correspondant à votre demande \n";
        champ = "\n";
        agebc ="test";
    }

//////////////////////////////////////////////////////////////////////////function split scrim//////////////////////////////////////////////////////////////////////////////////////
    function splitScrim(message,joueur,elo) {
        agebc = agebc + joueur;
        let dce = agebc.split(';');

        while (dce[nb] != undefined){
            let joueur = dce[nb].split('#');
            if (elo === joueur[1] || elo === "all"){
                champ = champ +"**Nom de team:** " + joueur[0] + "\n**Elo:** " + joueur[1] + "\n**Elo:** " + joueur[2] + "#" + joueur[3] + "\n\n" ; 
            }
            nb ++;
        }
        
        
        if (champ === "\n"){
            message.channel.send("aucune teams trouvé pour ces critères");
        }
        else{
            nb = 1;
            phraseScrim = phraseScrim + champ ;
            message.channel.send(phraseScrim);
        }

        phraseScrim = "Voici la liste des teams correspondant à votre demande \n";
        champ = "\n";
        agebc ="test";
    }

//////////////////////////////////////////////////////////////////////////!fileReset//////////////////////////////////////////////////////////////////////////////////////
    bot.on('message',message => {
        if (message.content[0] === Prefix) {
            let SplitMessage = message.content.split(' ');
            if (SplitMessage[0] === '!fileReset'){

                
                
                fs.unlink(nameServ + '/fichierLog.txt', (err) => {
                    nameServ= "./serv/" + message.guild.name + "_Joueur.txt";
                    message.channel.send(nameServ + ': fichier OFF');
                    fs.writeFileSync(nameServ," ");
                    message.channel.send(nameServ + ': fichier ON');
                });

                fs.unlink(nameServ + '/fichierLog.txt', (err) => {
                    nameServ= "./serv/" + message.guild.name + "_Scrim.txt";
                    message.channel.send(nameServ + ': fichier OFF');
                    fs.writeFileSync(nameServ," ");
                    message.channel.send(nameServ + ': fichier ON');
                });
            }
        }
    })

//////////////////////////////////////////////////////////////////////////!HELP//////////////////////////////////////////////////////////////////////////////////////
    bot.on('message',message => {
        if (message.content[0] === Prefix) {
            let SplitMessage = message.content.split(' ');
            if (SplitMessage[0] === '!help'){
                message.channel.send("**A quoi sert le bot @"+ name + "?**\n Comme son nom l'indique, ce bot permet de trouver des joueurs selon leurs lanes de prédilection et leurs elos mais ce n'est pas tout, il permet aux teams déjà formées ou qui souhaitent le faire, de trouver les joueurs qui leurs manquent.\nDans un second temps , il permet de trouver des Scrim de team en postulant et en recherchant en fonction de l'elo\n\n**Comment utiliser le bot @"+ name + "**\n**Pour s'enregistrer**: tapez\n```!regist [Pseudo LoL] [Elo] [Lane favorite]```\n\n**Pour trouver des joueurs**\n```!find [Elo] [Lane] > Trouve des joueurs selon l'élo et la lane demandés\nou  !find [Elo] all  > Trouve des joueurs selon l'élo demandé \nou  !find all [Lane] > Trouve des joueurs selon la lane demandée ``` \n**Pour enregistrer sa team pour scrim**: tapez\n```!registScrim [Nom de Team] [Elo]```\n\n**Pour trouver des teams pour Scrim**\n```!findScrim [Elo]  > Trouve des teams selon l'élo demandés```");
            }
        }
    })

 ////////////////////////////////////////////////////////////////////////// PLAYEUR (REGIST)////////////////////////////////////////////////////////////////////////
    bot.on('message',message => {
        if (message.content[0] === Prefix) {
            let SplitMessage = message.content.split(' ');
            if (SplitMessage[0] === '!regist'){
                if (SplitMessage.length === 4){
                    SplitMessage[1] = SplitMessage[1].toLowerCase();
                    SplitMessage[2] = SplitMessage[2].toLowerCase();
                    SplitMessage[3] = SplitMessage[3].toLowerCase();
                    if (SplitMessage[2] === "bronze" || SplitMessage[2] === "silver" || SplitMessage[2] === "gold" || SplitMessage[2] === "plat" || SplitMessage[2] === "diam" || SplitMessage[2] === "chall" || SplitMessage[2] === "master"){
                        if (SplitMessage[3] === "top" || SplitMessage[3] === "jgl" || SplitMessage[3] === "mid" || SplitMessage[3] === "adc" || SplitMessage[3] === "supp"|| SplitMessage[3] === "bot"){
                            
                            nameServ= "./serv/" + message.guild.name + "_Joueur.txt";
                            fichier = fs.readFileSync(nameServ);

                            if(SplitMessage[3] === "bot")SplitMessage[3]= "adc";
                            
                            fs.writeFileSync(nameServ, fichier + ";" + SplitMessage[1] + "#" +  SplitMessage[2] + "#" + SplitMessage[3]);
                            message.channel.send('**Nom:** ' + SplitMessage[1]);
                            message.channel.send('**Elo:** ' + SplitMessage[2]);
                            message.channel.send('**Lane:** ' + SplitMessage[3]);
                        }
                        else  sendError(message,":x: **Commande erronée !!** \n **Commande :** !regist [pseudo] [elo] [lane]\n\n Mauvaise syntaxe dans la **lane** \n Les choix sont [top] [mid] [jgl] [supp] [adc]");
                    }
                    else  sendError(message,":x: **Commande erronée !!** \n **Commande :** !regist [pseudo] [elo] [lane] \n\n Mauvaise syntaxe dans l'**elo** \n Les choix sont [Bronze] [Silver] [Gold] [plat] [Diam] [Chall] [Master]");
                }
                else sendError(message,":x: **Commande erronée !!** \n **Commande :** !regist [pseudo] [elo] [lane] \n\n **Elo:** Bronze, Silver, Gold, Plat, Diam, Chall, Master \n **Lane:** Top, Mid, Adc, Supp, jgl");
            }
        }
    })

    ////////////////////////////////////////////////////////////////////////// PLAYEUR (find)////////////////////////////////////////////////////////////////////////
    bot.on('message',message => {
        if (message.content[0] === Prefix) {
            let SplitMessage = message.content.split(' ');
            if (SplitMessage[0] === '!find'){
                if (SplitMessage.length === 3){
                    SplitMessage[1] = SplitMessage[1].toLowerCase();
                    SplitMessage[2] = SplitMessage[2].toLowerCase();
                    if (SplitMessage[1] === "bronze" || SplitMessage[1] === "silver" || SplitMessage[1] === "gold" || SplitMessage[1] === "plat" || SplitMessage[1] === "diam" || SplitMessage[1] === "chall" || SplitMessage[1] === "master" || SplitMessage[1] === "all"){
                        if (SplitMessage[2] === "top" || SplitMessage[2] === "jgl" || SplitMessage[2] === "mid" || SplitMessage[2] === "adc" || SplitMessage[2] === "supp"|| SplitMessage[2] === "bot"|| SplitMessage[2] === "all"){
                            
                            if(SplitMessage[2] === "bot")SplitMessage[2]= "adc";

                            nameServ= "./serv/" + message.guild.name + "_Joueur.txt";
                            fichier = fs.readFileSync(nameServ);
                            splitJoueur(message,fichier,SplitMessage[1],SplitMessage[2]);
                        }
                        else  sendError(message,":x: **Commande erronée !!** \n **Commande :** !find [elo] [lane] \n\n Mauvaise syntaxe dans la **lane** \n Les choix sont [top] [mid] [jgl] [supp] [adc] [all]");
                    }
                    else  sendError(message,":x: **Commande erronée !!** \n **Commande :** !find [elo] [lane] \n\n Mauvaise syntaxe dans l'**elo** \n Les choix sont [Bronze] [Silver] [Gold] [plat] [Diam] [Chall] [Master] [all]");
                }
                else sendError(message,":x: **Commande erronée !!** \n **Commande :** !find [elo] [lane] \n\n **Elo:** Bronze, Silver, Gold, Plat, Diam, Chall, Master ou all \n **Lane:** Top, Mid, Adc, Supp, Jgl ou All");
            }
        }
    })

    //////////////////////////////////////////////////////////////////////////SCRIM TEAM (registe)////////////////////////////////////////////////////////////////////////
    bot.on('message',message => {
        if (message.content[0] === Prefix) {
            let SplitMessage = message.content.split(' ');
            if (SplitMessage[0] === '!registScrim'){
                if (SplitMessage.length === 3){
                    SplitMessage[1] = SplitMessage[1].toLowerCase();
                    SplitMessage[2] = SplitMessage[2].toLowerCase();
                    nameSend = message.author.tag.toLocaleLowerCase();

                    if (SplitMessage[2] === "bronze" || SplitMessage[2] === "silver" || SplitMessage[2] === "gold" || SplitMessage[2] === "plat" || SplitMessage[2] === "diam" || SplitMessage[2] === "chall" || SplitMessage[2] === "master"){
                        
                        nameServ= "./serv/" + message.guild.name + "_Scrim.txt";
                        fs.writeFileSync(nameServ, fichier + ";" + SplitMessage[1] + "#" +  SplitMessage[2] + "#" +  nameSend);
                        message.channel.send('**Nom:** ' + SplitMessage[1]);
                        message.channel.send('**Elo:** ' + SplitMessage[2]);
                    }
                    else  sendError(message,":x: **Commande erronée !!** \n **Commande :** !registScrim [pseudo] [elo] \n\n Mauvaise syntaxe dans l'**elo** \n Les choix sont [Bronze] [Silver] [Gold] [plat] [Diam] [Chall] [Master]");
                }
                else sendError(message,":x: **Commande erronée !!** \n **Commande :** !registScrim [pseudo] [elo] \n\n **Elo:** Bronze, Silver, Gold, Plat, Diam, Chall, Master");
            }
        }
    })

    //////////////////////////////////////////////////////////////////////////SCRIM TEAM (find)////////////////////////////////////////////////////////////////////////

    bot.on('message',message => {
        if (message.content[0] === Prefix) {
            let SplitMessage = message.content.split(' ');
            if (SplitMessage[0] === '!findScrim'){
                if (SplitMessage.length === 2){
                    SplitMessage[1] = SplitMessage[1].toLowerCase();
                    if (SplitMessage[1] === "bronze" || SplitMessage[1] === "silver" || SplitMessage[1] === "gold" || SplitMessage[1] === "plat" || SplitMessage[1] === "diam" || SplitMessage[1] === "chall" || SplitMessage[1] === "master" || SplitMessage[1] === "all"){
                        
                        nameServ= "./serv/" + message.guild.name + "_Scrim.txt";
                        fichier = fs.readFileSync(nameServ);
                        splitScrim(message,fichier,SplitMessage[1]);
                    }
                    else  sendError(message,":x: **Commande erronée !!** \n Mauvaise syntaxe dans l'**elo** \n Les choix sont [Bronze] [Silver] [Gold] [plat] [Diam] [Chall] [Master] [all]");
                }
                else sendError(message,":x: **Commande erronée !!** \n **Commande :** !findScrim [elo] \n **Elo:** Bronze, Silver, Gold, Plat, Diam, Chall, Master ou all");
            }
        }
    })


bot.login('NDYzMjYzNjk3Mjk3NzM1Njkx.DhuJqA.FK0iJbFGVZKfFmFFrrTj2u6tgoE')