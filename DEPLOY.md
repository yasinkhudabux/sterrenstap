# SterrenStap online zetten via Coolify

Deze map is klaar om in de ROOT van een GitHub-repository te plaatsen.
Upload de LOSSE bestanden (na uitpakken); upload niet alleen het ZIP-bestand.

## 1. GitHub
1. Ga naar https://github.com/new en maak een repository met naam `sterrenstap` (bij voorkeur **Private**, wanneer jouw GitHub-integratie in Coolify al toegang heeft).
2. Open de repository, klik `Add file` > `Upload files`.
3. Upload alle bestanden uit deze map. `index.html` en `Dockerfile` moeten direct op het hoogste niveau van de repository staan.
4. Klik `Commit changes`.

## 2. Coolify
1. Ga naar je bestaande Coolify-dashboard en maak een NIEUWE applicatie aan; laat de bestaande Zonura-app staan.
2. Kies de aangesloten GitHub-bron (of public repository als de repository public is) en selecteer `sterrenstap`, branch `main`.
3. Kies de buildstrategie **Dockerfile** (Base Directory `/`, Dockerfile Location `Dockerfile` of `/Dockerfile` afhankelijk van de versie).
4. Bij Ports Exposes gebruik `80` (niet 3000). Je hoeft geen database of environment variables in te vullen.
5. Voeg onder de applicatie-instellingen een domein toe: `https://sterrenstap.zonura.nl` en internal Port `80`.
6. Kies bij General > Security > Authentication, indien beschikbaar, HTTP Basic Authentication voor de testomgeving (zelf gekozen gebruikersnaam/wachtwoord). Deel deze gegevens alleen met testers.
7. Klik Deploy. De app heeft geen database nodig.

## 3. DNS bij Antagonist
Maak een A-record aan in de DNS-zone van `zonura.nl`:
- Type: `A`
- Naam/Host: `sterrenstap`
- Waarde: het PUBLIEKE IPv4-adres van dezelfde VPS waarop Coolify draait
- TTL: standaardwaarde

Voeg **geen** CNAME of A-record voor @ / www aanpassingen toe; verander de bestaande Zonura-site en mailrecords niet.

DNS kan even nodig hebben om bij te werken. Zodra het domein naar de VPS wijst en Coolify HTTPS heeft afgehandeld, open `https://sterrenstap.zonura.nl` op je iPad in Safari.

## 4. iPad
1. Open de website in Safari (geen privetab).
2. Maak een testprofiel en rond een les af.
3. Open 'Ouderhoek' om voortgang te bekijken.
4. Tik op Delen > Zet op beginscherm.
5. Controleer ook de liggende oriëntatie.

## Let op
- Dit is een **demo/testversie**, geen afgerond educatief product.
- Er is nog **geen echte accountbeveiliging** voor ouders of kinderen. Basisbeveiliging voor de testsite kan via Coolify HTTP Basic Authentication.
- Voortgang wordt lokaal op de iPad opgeslagen en wordt NIET automatisch gesynchroniseerd tussen apparaten. Gebruik de back-upfunctie in de Ouderhoek.
- Noindex staat voorlopig aan: dit is bedoeld als niet-geindexeerde testomgeving, NIET als toegangsbeveiliging.
