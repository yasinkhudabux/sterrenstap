/* Nederlandse voorbeeldlessen. Vrij aan te passen; controleer curriculum didactisch voor publieke lancering. */
(function(){
'use strict';
  const GROUPS=[
    {id:'p',name:'Peuter',age:'vanaf 3 jaar',emoji:'🧸',label:'Spelenderwijs ontdekken'},
    {id:'g1',name:'Groep 1',age:'ca. 4–5 jaar',emoji:'🌈',label:'Ontdekken & herkennen'},
    {id:'g2',name:'Groep 2',age:'ca. 5–6 jaar',emoji:'🦋',label:'Voorbereiden op lezen'},
    {id:'g3',name:'Groep 3',age:'ca. 6–7 jaar',emoji:'📖',label:'Leren lezen & rekenen'},
    {id:'g4',name:'Groep 4',age:'ca. 7–8 jaar',emoji:'🚀',label:'Sterker in taal & tafels'},
    {id:'g5',name:'Groep 5',age:'ca. 8–9 jaar',emoji:'🔍',label:'Leren begrijpen'},
    {id:'g6',name:'Groep 6',age:'ca. 9–10 jaar',emoji:'🪐',label:'Slimmer rekenen & denken'},
    {id:'g7',name:'Groep 7',age:'ca. 10–11 jaar',emoji:'🧠',label:'Nieuwe uitdagingen'},
    {id:'g8',name:'Groep 8',age:'ca. 11–12 jaar',emoji:'🏆',label:'Klaar voor de volgende stap'}
  ];
  const q=(question,options,answer,explain,visual='',passage='')=>({question,options,answer,explain,visual,passage});
  const lessons=[];
  const L=(id,group,title,icon,subject,desc,questions)=>lessons.push({id,group,title,icon,subject,desc,questions});
  L('p-kleuren','p','Kleuren ontdekken','🎨','Kleuren','Herken de kleuren om je heen.',[
    q('Welke kleur heeft een rijpe banaan?',['Geel','Blauw','Paars','Roze'],'Geel','Een rijpe banaan is meestal geel.','🍌'),
    q('Welke kleur heeft gras meestal?',['Rood','Groen','Paars','Zwart'],'Groen','Gras is meestal groen.','🌱'),
    q('Welke kleur heeft een aardbei meestal?',['Blauw','Geel','Rood','Wit'],'Rood','Een rijpe aardbei is rood.','🍓'),
    q('Welke kleur heeft de lucht vaak op een heldere dag?',['Blauw','Bruin','Paars','Oranje'],'Blauw','Op een heldere dag lijkt de lucht blauw.','☁️'),
    q('Wat is de kleur van deze bloem? 🌻',['Geel','Groen','Blauw','Zwart'],'Geel','De bloemblaadjes van een zonnebloem zijn geel.','🌻')]);
  L('p-tellen','p','Tellen met dieren','🐣','Rekenen','Tel dieren van één tot vijf.',[
    q('Hoeveel kuikens zie je?',['2','3','1','4'],'3','Je ziet drie kuikens.','🐥 🐥 🐥'),
    q('Hoeveel katten zie je?',['4','2','5','3'],'2','Er zijn twee katten.','🐱 🐱'),
    q('Hoeveel vissen zie je?',['1','3','2','4'],'4','Tel maar mee: één, twee, drie, vier!','🐟 🐟 🐟 🐟'),
    q('Hoeveel appels zie je?',['5','2','4','3'],'5','Je ziet vijf appels.','🍎 🍎 🍎 🍎 🍎'),
    q('Hoeveel konijntjes zie je?',['1','2','3','4'],'1','Het is één konijntje.','🐰')]);
  L('p-vormen','p','Vormenfeest','🔷','Vormen','Ontdek cirkels, vierkanten en driehoeken.',[
    q('Welke vorm is rond?',['Cirkel','Vierkant','Driehoek','Rechthoek'],'Cirkel','Een cirkel is helemaal rond.','🔴'),
    q('Hoeveel hoeken heeft een driehoek?',['2','3','4','5'],'3','Een driehoek heeft drie hoeken.','🔺'),
    q('Welke vorm heeft vier even lange zijden?',['Cirkel','Vierkant','Driehoek','Ovaal'],'Vierkant','Een vierkant heeft vier even lange zijden.','🟦'),
    q('Welke vorm lijkt op een bal?',['Driehoek','Cirkel','Vierkant','Ster'],'Cirkel','Een bal is rond, net als een cirkel.','⚽'),
    q('Wat heeft de vorm van een ster?',['⭐','🔴','🔺','🟦'],'⭐','De ster heeft punten.','🌟')]);
  L('p-sleepvormen','p','Sleep de vormen','🧩','Vormen','Sleep of tik de juiste vorm naar de speelplek.',[
    q('Zoek de cirkel!',['Vierkant','Cirkel','Driehoek','Ster'],'Cirkel','Goed zo, dat is de cirkel!','🔴'),
    q('Zoek de driehoek!',['Cirkel','Ster','Driehoek','Vierkant'],'Driehoek','Een driehoek heeft drie punten.','🔺'),
    q('Zoek het vierkant!',['Ster','Vierkant','Cirkel','Driehoek'],'Vierkant','Een vierkant heeft vier hoeken.','🟦'),
    q('Zoek de ster!',['Driehoek','Cirkel','Ster','Vierkant'],'Ster','Dat is een mooie ster!','⭐'),
    q('Zoek de cirkel nog een keer!',['Ster','Driehoek','Vierkant','Cirkel'],'Cirkel','Een cirkel is helemaal rond.','🔴')]);
  L('g1-beginklank','g1','Letterpret','🔤','Taal','Hoor met welke klank een woord begint.',[
    q('Met welke letter begint maan?',['M','S','P','K'],'M','Maan begint met de klank m.','🌙'),
    q('Met welke letter begint vis?',['V','B','T','L'],'V','Vis begint met een v.','🐟'),
    q('Welk woord begint met de letter B?',['Boom','Kat','Roos','Maan'],'Boom','Boom begint met een b.','🌳'),
    q('Met welke letter begint zon?',['P','Z','F','N'],'Z','Zon begint met een z.','☀️'),
    q('Welk woord begint met de letter K?',['Appel','Kat','Vis','Muis'],'Kat','Kat begint met een k.','🐱')]);
  L('g1-tellen','g1','Tellen tot 10','🔢','Rekenen','Tel en herken getallen tot tien.',[
    q('Hoeveel sterren zie je?',['3','4','5','6'],'4','Je telt vier sterren.','⭐ ⭐ ⭐ ⭐'),
    q('Welk getal komt na 5?',['4','8','6','3'],'6','Na vijf komt zes.','5 → ?'),
    q('Hoeveel vingers heeft één hand meestal?',['4','5','6','10'],'5','Een hand heeft vijf vingers.','✋'),
    q('Wat is meer?',['2','7','1','4'],'7','Zeven is het grootste getal.','🔢'),
    q('Welk getal komt vóór 9?',['7','10','8','6'],'8','Acht komt vóór negen.','? → 9')]);
  L('g1-ontdekken','g1','De wereld om mij heen','🌦️','Wereld','Dieren, seizoenen en het weer.',[
    q('Welk dier zegt miauw?',['Hond','Kat','Koe','Schaap'],'Kat','Een kat zegt miauw.','🐈'),
    q('Wat trek je aan als het regent?',['Zonnebril','Regenjas','Zwembroek','Sandalen'],'Regenjas','Een regenjas houdt je droog.','🌧️'),
    q('Wat geeft ons overdag licht?',['Maan','Sterren','Zon','Lampion'],'Zon','Overdag geeft de zon ons licht.','☀️'),
    q('In welk seizoen vallen vaak de bladeren?',['Lente','Zomer','Herfst','Winter'],'Herfst','In de herfst vallen veel bladeren.','🍂'),
    q('Welk dier kan vliegen?',['Vis','Vlinder','Slak','Konijn'],'Vlinder','Een vlinder vliegt met vleugels.','🦋')]);
  L('g2-letters','g2','Letters herkennen','🔡','Taal','Herken letters en eerste klanken.',[
    q('Welke letter hoor je vooraan in appel?',['A','O','K','M'],'A','Appel begint met de a-klank.','🍎'),
    q('Welke letter ontbreekt? K _ T',['O','A','U','E'],'A','K-A-T is kat.','🐈'),
    q('Welke letter is een klinker?',['P','A','T','S'],'A','A is een klinker.','🔠'),
    q('Welk woord begint met S?',['Sok','Bal','Muis','Pen'],'Sok','Sok begint met s.','🧦'),
    q('Welke letter hoort aan het einde van vis?',['M','P','S','N'],'S','Vi-s eindigt op s.','🐟')]);
  L('g2-sommen','g2','Kleine sommetjes','🍎','Rekenen','Oefen optellen tot tien.',[
    q('Je hebt 2 appels en krijgt er 1 bij. Hoeveel?',['2','3','4','5'],'3','2 + 1 = 3.','🍎🍎 + 🍎'),
    q('Wat is 4 + 2?',['5','7','6','8'],'6','Vier plus twee is zes.','4 + 2'),
    q('Wat is 3 + 3?',['4','6','7','5'],'6','Drie en drie samen is zes.','3 + 3'),
    q('Er zijn 5 vogels. Eén vliegt weg. Hoeveel blijven?',['4','6','3','2'],'4','5 - 1 = 4.','🐦'),
    q('Wat is 7 + 2?',['9','10','8','6'],'9','Zeven plus twee is negen.','7 + 2')]);
  L('g2-patronen','g2','Zoek het patroon','🧩','Denken','Wat komt hierna?',[
    q('Wat komt erna? 🔴 🔵 🔴 🔵 ?',['🔴','🟢','🟡','🟣'],'🔴','De kleuren wisselen steeds rood en blauw.','🔴 🔵 🔴 🔵 ?'),
    q('Wat komt erna? 1, 2, 3, 4, ?',['7','5','6','8'],'5','Je telt steeds eentje verder.','1 2 3 4 ?'),
    q('Wat komt erna? ⭐ 🌙 ⭐ 🌙 ?',['🌞','🌙','⭐','☁️'],'⭐','Ster en maan wisselen elkaar af.','⭐ 🌙 ⭐ 🌙 ?'),
    q('Wat komt erna? 2, 4, 6, ?',['7','8','9','10'],'8','Je telt telkens twee erbij.','2 4 6 ?'),
    q('Wat komt erna? 🟦 🟦 🟡 🟦 🟦 🟡 ?',['🟦','🟡','🟥','🟢'],'🟦','Na twee blauwe en één gele begint het opnieuw.','🟦 🟦 🟡 ?')]);
  L('g3-lezen','g3','Mijn eerste woorden','📖','Lezen','Lees en herken eenvoudige woorden.',[
    q('Welk woord hoort bij dit dier?',['kat','kan','kast','kam'],'kat','K-A-T vormt het woord kat.','🐱'),
    q('Welk woord hoort bij dit plaatje?',['man','maan','mand','maat'],'maan','Je ziet de maan.','🌙'),
    q('Welk woord rijmt op huis?',['boos','muis','haas','vis'],'muis','Huis en muis hebben hetzelfde eindgeluid.','🏠'),
    q('Welk woord hoort bij dit plaatje?',['boom','boon','boot','boos'],'boom','Dit is een boom.','🌳'),
    q('Welke twee letters hoor je aan het begin van bloem?',['bl','br','kl','sl'],'bl','Bloem begint met b-l.','🌸')]);
  L('g3-optellen','g3','Optellen tot 20','➕','Rekenen','Oefen sommen tot twintig.',[
    q('Wat is 8 + 5?',['12','13','14','15'],'13','8 + 2 = 10, en dan nog 3 = 13.','8 + 5'),
    q('Wat is 9 + 7?',['15','16','17','14'],'16','9 + 1 = 10, plus 6 = 16.','9 + 7'),
    q('Wat is 6 + 6?',['10','13','12','11'],'12','Zes en zes is twaalf.','6 + 6'),
    q('Wat is 11 + 4?',['14','15','16','13'],'15','Elf plus vier is vijftien.','11 + 4'),
    q('Wat is 7 + 8?',['15','14','16','17'],'15','7 + 3 = 10, plus 5 = 15.','7 + 8')]);
  L('g3-aftrekken','g3','Eraf halen','➖','Rekenen','Leer aftrekken met kleine sommen.',[
    q('Wat is 10 − 3?',['7','6','8','9'],'7','Tien min drie is zeven.','10 − 3'),
    q('Wat is 15 − 5?',['9','11','10','8'],'10','Vijftien min vijf is tien.','15 − 5'),
    q('Wat is 13 − 6?',['8','7','6','9'],'7','Dertien min zes is zeven.','13 − 6'),
    q('Wat is 18 − 9?',['8','10','11','9'],'9','Achttien min negen is negen.','18 − 9'),
    q('Wat is 12 − 4?',['9','8','7','6'],'8','Twaalf min vier is acht.','12 − 4')]);
  L('g4-tafels','g4','Tafelkampioen','✖️','Rekenen','Oefen de tafels van 2, 5 en 10.',[
    q('Wat is 2 × 6?',['12','14','10','8'],'12','Zes keer twee is twaalf.','2 × 6'),
    q('Wat is 5 × 4?',['15','25','20','30'],'20','Vier groepjes van vijf is twintig.','5 × 4'),
    q('Wat is 10 × 7?',['17','70','77','700'],'70','Zeven keer tien is zeventig.','10 × 7'),
    q('Wat is 2 × 9?',['16','20','18','19'],'18','Negen plus negen is achttien.','2 × 9'),
    q('Wat is 5 × 8?',['35','45','40','30'],'40','Acht keer vijf is veertig.','5 × 8')]);
  L('g4-spelling','g4','Goed gespeld!','✏️','Taal','Kies de juiste spelling.',[
    q('Welk woord is goed gespeld?',['viets','fiets','fietz','viest'],'fiets','Het juiste woord is fiets.','🚲'),
    q('Welk woord is goed gespeld?',['school','sgool','schoool','skool'],'school','Je schrijft s-c-h-o-o-l.','🏫'),
    q('Welk woord is goed gespeld?',['konijn','konein','koneijn','konyn'],'konijn','Konijn schrijf je met ij.','🐇'),
    q('Wat is het meervoud van boek?',['boeks','boeken','boeke','boeksn'],'boeken','Eén boek, twee boeken.','📚'),
    q('Welk woord is goed gespeld?',['bloemen','bloome','bloeemn','blomen'],'bloemen','Bloem wordt bloemen in het meervoud.','💐')]);
  L('g4-klok','g4','Hoe laat is het?','🕒','Tijd','Oefen hele en halve uren.',[
    q('Wat betekent half drie?',['2:30','3:30','3:00','2:00'],'2:30','Half drie is een half uur vóór drie.','🕝'),
    q('Hoeveel minuten zitten in één uur?',['30','45','60','100'],'60','Een uur duurt zestig minuten.','⏰'),
    q('Wat betekent kwart over vier?',['4:45','4:15','3:45','5:15'],'4:15','Kwart over vier is vijftien minuten na vier.','🕓'),
    q('Hoeveel seconden zitten in één minuut?',['10','100','30','60'],'60','Een minuut duurt zestig seconden.','⏱️'),
    q('Wat is een half uur na 8:00?',['8:15','8:30','9:00','7:30'],'8:30','Dertig minuten na acht uur is half negen.','🕣')]);
  L('g5-delen','g5','Eerlijk verdelen','➗','Rekenen','Leer delen in gelijke groepjes.',[
    q('Wat is 24 ÷ 4?',['5','6','8','7'],'6','Vier groepjes van zes is vierentwintig.','24 ÷ 4'),
    q('Wat is 35 ÷ 5?',['6','8','7','9'],'7','Vijf keer zeven is vijfendertig.','35 ÷ 5'),
    q('Wat is 48 ÷ 6?',['7','9','8','6'],'8','Zes keer acht is achtenveertig.','48 ÷ 6'),
    q('Wat is 63 ÷ 9?',['7','8','6','9'],'7','Negen keer zeven is drieënzestig.','63 ÷ 9'),
    q('Wat is 72 ÷ 8?',['8','7','9','10'],'9','Acht keer negen is tweeënzeventig.','72 ÷ 8')]);
  L('g5-begrijpen','g5','Leesdetective','🕵️','Lezen','Lees een tekst en ontdek de betekenis.',[
    q('Waarom pakt Sara haar paraplu?',['Omdat het regent','Omdat ze gaat zwemmen','Omdat het donker is','Omdat ze slaapt'],'Omdat het regent','In de tekst staat dat er regen is voorspeld.','🌧️','Sara kijkt uit het raam. De lucht is grijs. Er is regen voorspeld, dus neemt ze haar paraplu mee.'),
    q('Waar gaan de kinderen heen?',['Naar de bakker','Naar de bibliotheek','Naar het zwembad','Naar school'],'Naar de bibliotheek','Ze gaan boeken lenen in de bibliotheek.','📚','Mila en Amir willen een nieuw boek lenen. Ze lopen naar de bibliotheek aan het plein.'),
    q('Welk dier is kwijt?',['Een kat','Een hond','Een konijn','Een papegaai'],'Een konijn','Tom zoekt zijn konijn Pluis.','🐇','Tom zoekt zijn konijn Pluis. Hij kijkt in de tuin. Daar zit Pluis onder een struik.'),
    q('Wanneer gaan ze picknicken?',['Op maandag','Op vrijdag','Op zondag','Op woensdag'],'Op zondag','Er staat dat ze zondag naar het park gaan.','🧺','Zondag gaat de familie naar het park. Iedereen neemt iets lekkers mee voor een picknick.'),
    q('Wat moet Noor eerst doen?',['Haar jas pakken','Haar tanden poetsen','Haar fiets wassen','Haar boek lezen'],'Haar tanden poetsen','Mama vraagt om eerst tanden te poetsen.','🪥','Noor wil gaan slapen. Haar moeder zegt: "Poets eerst je tanden en pak daarna je knuffel."')]);
  L('g5-tafels','g5','De moeilijke tafels','🚀','Rekenen','De tafels van 6, 7, 8 en 9.',[
    q('Wat is 7 × 8?',['54','56','64','48'],'56','Zeven keer acht is zesenvijftig.','7 × 8'),
    q('Wat is 6 × 9?',['45','56','54','63'],'54','Zes keer negen is vierenvijftig.','6 × 9'),
    q('Wat is 8 × 8?',['62','72','56','64'],'64','Acht keer acht is vierenzestig.','8 × 8'),
    q('Wat is 9 × 7?',['72','63','56','64'],'63','Negen keer zeven is drieënzestig.','9 × 7'),
    q('Wat is 6 × 7?',['48','36','42','49'],'42','Zes keer zeven is tweeënveertig.','6 × 7')]);
  L('g6-breuken','g6','Breukenbrein','🍕','Rekenen','Ontdek delen van een geheel.',[
    q('Wat is de helft van 20?',['5','8','10','12'],'10','De helft van twintig is tien.','½ van 20'),
    q('Hoeveel is ¼ van 24?',['4','6','8','12'],'6','Vier gelijke delen van 24 zijn elk 6.','¼ van 24'),
    q('Welke breuk is gelijk aan ½?',['2/4','1/3','3/4','1/4'],'2/4','Twee vierde is evenveel als één tweede.','½ = ?'),
    q('Hoeveel is ¾ van 20?',['5','10','12','15'],'15','Een kwart van 20 is 5; drie kwart is 15.','¾ van 20'),
    q('Wat is groter?',['1/4','1/2','1/8','1/10'],'1/2','Van deze breuken is de helft het grootst.','🍕')]);
  L('g6-woordsoorten','g6','Taalonderzoekers','📝','Taal','Herken zelfstandige naamwoorden en werkwoorden.',[
    q('Welk woord is een werkwoord?',['lopen','stoel','groen','kamer'],'lopen','Lopen vertelt wat iemand doet.','🏃'),
    q('Welk woord is een zelfstandig naamwoord?',['mooi','springen','tafel','snel'],'tafel','Een tafel is een ding en dus een zelfstandig naamwoord.','🪑'),
    q('Wat is het bijvoeglijk naamwoord in "de rode fiets"?',['de','rode','fiets','geen'],'rode','Rode vertelt iets over de fiets.','🚲'),
    q('Wat is de verleden tijd van lopen (ik)?',['liep','loopt','lopen','geloop'],'liep','Ik liep is de verleden tijd.','👟'),
    q('Welk woord is een lidwoord?',['kat','de','fietsen','groot'],'de','De is een lidwoord.','✏️')]);
  L('g6-wereld','g6','Planeet ontdekkers','🌍','Wereld','Leer over aarde, natuur en wetenschap.',[
    q('Welke planeet noemen we de rode planeet?',['Venus','Mars','Jupiter','Aarde'],'Mars','Mars ziet er roodachtig uit door ijzeroxide.','🔴'),
    q('Wat hebben planten nodig om te groeien?',['Alleen stenen','Water en licht','Alleen zand','Plastic'],'Water en licht','Planten hebben onder andere water en licht nodig.','🌿'),
    q('Wat is de grootste oceaan?',['Atlantische Oceaan','Indische Oceaan','Stille Oceaan','Noordelijke IJszee'],'Stille Oceaan','De Stille Oceaan is de grootste oceaan.','🌊'),
    q('Wat draait om de aarde?',['De maan','De zon','Mars','Jupiter'],'De maan','De maan draait om de aarde.','🌙'),
    q('Welke kracht laat een appel naar beneden vallen?',['Magnetisme','Zwaartekracht','Zonlicht','Geluid'],'Zwaartekracht','Zwaartekracht trekt voorwerpen naar de aarde.','🍎')]);
  L('g7-procenten','g7','Procentenpro','📊','Rekenen','Reken met percentages en korting.',[
    q('Hoeveel is 10% van 200?',['10','20','30','40'],'20','Tien procent is één tiende: 200 ÷ 10 = 20.','10%'),
    q('Een jas van €80 krijgt 25% korting. Wat kost de jas?',['€20','€60','€65','€75'],'€60','25% van €80 is €20; je betaalt €60.','🏷️'),
    q('Hoeveel is 50% van 90?',['40','35','45','50'],'45','Vijftig procent betekent de helft.','50%'),
    q('Wat is 5% van 100?',['5','10','15','50'],'5','Vijf procent van honderd is vijf.','5%'),
    q('Welke breuk is gelijk aan 25%?',['1/2','1/4','1/5','3/4'],'1/4','Vijfentwintig procent is één kwart.','25%')]);
  L('g7-grammatica','g7','Zinnen ontleden','📘','Taal','Oefen onderwerp, gezegde en zinsdelen.',[
    q('Wat is het onderwerp in "De hond blaft hard"?',['De hond','blaft','hard','geen'],'De hond','Wie blaft? De hond.','🐕'),
    q('Wat is de persoonsvorm in "Mila leest een boek"?',['Mila','boek','leest','een'],'leest','Leest is de persoonsvorm.','📖'),
    q('Welk woord is een voorzetsel?',['onder','rennen','mooi','tafel'],'onder','Onder beschrijft bijvoorbeeld een plaats.','✏️'),
    q('Welke zin is een vraagzin?',['Ik lees.','Ga zitten.','Waar woon je?','Wat mooi!'],'Waar woon je?','Deze zin stelt een vraag.','❓'),
    q('Wat is de persoonsvorm in "Wij fietsten gisteren"?',['Wij','fietsten','gisteren','geen'],'fietsten','Maak de tijd anders: wij fietsen. Het werkwoord verandert.','🚲')]);
  L('g7-breuken','g7','Breuken & kommagetallen','🧮','Rekenen','Zet breuken om en tel ermee.',[
    q('Wat is ½ als kommagetal?',['0,2','0,25','0,5','1,5'],'0,5','Een helft is 0,5.','½'),
    q('Wat is ¼ + ¼?',['¼','½','¾','1'],'½','Twee kwarten is één helft.','¼ + ¼'),
    q('Wat is 0,75 als breuk?',['1/4','1/2','3/4','2/3'],'3/4','0,75 betekent drie kwart.','0,75'),
    q('Wat is 1,2 + 0,6?',['1,6','1,8','2,0','0,6'],'1,8','1,2 plus 0,6 is 1,8.','1,2 + 0,6'),
    q('Welke breuk is gelijk aan 0,2?',['1/2','1/4','1/5','2/3'],'1/5','0,2 is twee tienden, of één vijfde.','0,2')]);
  L('g8-verhoudingen','g8','Verhoudingen begrijpen','⚖️','Rekenen','Verhoudingen in recepten en situaties.',[
    q('Een recept voor 2 personen gebruikt 100 g rijst. Hoeveel voor 6 personen?',['200 g','300 g','400 g','600 g'],'300 g','Zes personen is drie keer zoveel als twee.','🍚'),
    q('De verhouding rood:blauw is 2:3. Bij 10 rode knikkers horen hoeveel blauwe?',['12','15','18','20'],'15','Vijf keer 2 is 10, dus vijf keer 3 is 15.','🔴 🔵'),
    q('Op een kaart is 1 cm gelijk aan 5 km. Hoeveel is 4 cm?',['9 km','15 km','20 km','25 km'],'20 km','Vier keer vijf kilometer is twintig kilometer.','🗺️'),
    q('Een auto rijdt 60 km in 1 uur. Hoe ver in 3 uur bij dezelfde snelheid?',['120 km','150 km','180 km','200 km'],'180 km','Drie keer zestig is honderdtachtig.','🚗'),
    q('Drie schriften kosten €6. Hoeveel kosten vijf schriften?',['€8','€10','€12','€15'],'€10','Eén schrift kost €2. Vijf kosten €10.','📒')]);
  L('g8-lezen','g8','Begrijpend lezen plus','🧠','Lezen','Haal conclusies uit korte teksten.',[
    q('Wat is waarschijnlijk het doel van de schrijver?',['Een recept geven','Informatie geven','Een grap maken','Een verhaal verzinnen'],'Informatie geven','De tekst legt uit hoe bijen helpen bij bestuiving.','🐝','Bijen vliegen van bloem naar bloem. Daarbij nemen ze stuifmeel mee, waardoor veel planten zich kunnen voortplanten.'),
    q('Welke conclusie kun je trekken?',['Samir heeft een lekke band','Samir gaat zwemmen','Samir mist de bus','Samir is verdwaald'],'Samir heeft een lekke band','Zijn band is plat en hij hoort lucht ontsnappen.','🚲','Samir merkt dat zijn fiets steeds zwaarder trapt. Hij stopt en ziet dat zijn achterband plat is. Hij hoort een zacht sissend geluid.'),
    q('Wat betekent het woord "duurzaam" hier?',['Snel kapot','Lang bruikbaar en milieubewust','Erg duur','Gemaakt van papier'],'Lang bruikbaar en milieubewust','Duurzaam gaat hier over minder afval en langer gebruik.','♻️','De school kiest duurzame bekers die steeds opnieuw gebruikt kunnen worden. Zo is er minder afval.'),
    q('Waarom wordt het evenement uitgesteld?',['Te weinig bezoekers','Omdat het gaat regenen','Door de warmte','Door een kapotte bus'],'Door de warmte','De tekst noemt uitzonderlijke hitte als reden.','☀️','Het sporttoernooi zou op woensdag plaatsvinden. Vanwege de uitzonderlijke hitte verplaatst de organisatie het naar vrijdag.'),
    q('Wat is de hoofdgedachte van de tekst?',['Bomen zijn groen','Bomen helpen de stad koeler maken','Er zijn veel auto’s','In de stad wonen dieren'],'Bomen helpen de stad koeler maken','Dat is de belangrijkste boodschap.','🌳','In hete zomers kunnen steden sterk opwarmen. Bomen zorgen voor schaduw en verdampen water. Daardoor helpen ze buurten koeler te houden.')]);
  L('g8-rekenen','g8','Rekenuitdaging','🏆','Rekenen','Oefen procenten, decimalen en handige sommen.',[
    q('Wat is 15% van 240?',['24','30','36','40'],'36','10% is 24, 5% is 12; samen 36.','15%'),
    q('Wat is 3,75 + 2,8?',['6,45','6,55','5,55','7,05'],'6,55','3,75 + 2,80 = 6,55.','3,75 + 2,8'),
    q('Een shirt kost €45 en krijgt 20% korting. Wat betaal je?',['€25','€36','€40','€35'],'€36','20% van 45 is 9, dus 45 - 9 = 36.','🏷️'),
    q('Wat is ⅔ van 60?',['20','30','40','45'],'40','Een derde van 60 is 20; twee derde is 40.','⅔'),
    q('Wat is de oppervlakte van 8 m bij 5 m?',['13 m²','26 m²','40 m²','80 m²'],'40 m²','Oppervlakte = lengte × breedte = 8 × 5.','📐')]);


  // Verdere thema's per groep: speels oefenen, geen volledig gevalideerde leerlijn.
  L('p-geluiden','p','Dierengeluiden','🐮','Wereld','Herken geluiden van dieren.',[
    q('Welk dier blaft?',['Een hond','Een kip','Een vis','Een kat'],'Een hond','Een hond zegt waf!','🐶'),
    q('Welk dier zegt boe?',['Een muis','Een koe','Een eend','Een slang'],'Een koe','Een koe zegt boe.','🐄'),
    q('Wie kwaakt?',['Een paard','Een eend','Een poes','Een vlinder'],'Een eend','Eenden kwaken.','🦆'),
    q('Welk dier miauwt?',['Een hond','Een koe','Een kat','Een varken'],'Een kat','Een kat zegt miauw.','🐈'),
    q('Wie zegt kukeleku?',['Een haan','Een kikker','Een koe','Een ezel'],'Een haan','De haan kraait kukeleku.','🐓')]);
  L('p-grootklein','p','Groot en klein','🐘','Vormen','Vergelijk groot, klein, hoog en laag.',[
    q('Welk dier is meestal het grootst?',['Muis','Olifant','Kat','Konijn'],'Olifant','Een olifant is veel groter dan een muis.','🐘 🐭'),
    q('Wat is meestal hoger?',['Een huis','Een schoen','Een appel','Een beker'],'Een huis','Een huis is vaak veel hoger dan een schoen.','🏠'),
    q('Wat is het kleinste?',['Bus','Fiets','Mier','Boom'],'Mier','Een mier is heel klein.','🐜'),
    q('Welk voorwerp is meestal langer?',['Potlood','Trein','Lepel','Sleutel'],'Trein','Een trein is veel langer dan een potlood.','🚆'),
    q('Wat is zwaar?',['Veertje','Ballon','Auto','Blaadje'],'Auto','Een auto is veel zwaarder dan een veertje.','🚗')]);
  L('g1-rijmen','g1','Rijmfeest','🎵','Taal','Hoor welke woorden op elkaar rijmen.',[
    q('Wat rijmt op kat?',['Bal','Mat','Muis','Zon'],'Mat','Kat en mat eindigen met dezelfde klank.','🐈'),
    q('Wat rijmt op boom?',['Roos','Maan','Droom','Beker'],'Droom','Boom en droom rijmen op -oom.','🌳'),
    q('Wat rijmt op vis?',['Mis','Pet','Koe','Kas'],'Mis','Vis en mis hebben dezelfde eindklank.','🐟'),
    q('Wat rijmt op huis?',['Muis','Hoed','Berg','Roos'],'Muis','Huis en muis rijmen.','🏠'),
    q('Wat rijmt op maan?',['Zon','Baan','Ster','Boom'],'Baan','Maan en baan hebben dezelfde eindklank.','🌙')]);
  L('g1-patronen','g1','Wat komt hierna?','🧩','Rekenen','Herken en maak patronen.',[
    q('🔴 🔵 🔴 🔵 Wat komt hierna?',['🔴','🟢','🟡','🔵'],'🔴','De kleuren wisselen steeds af.','🔴 🔵'),
    q('1, 2, 3, ... Wat komt erna?',['5','4','6','2'],'4','Na drie komt vier.','1 2 3'),
    q('⭐ 🌙 ⭐ 🌙 Wat komt hierna?',['🌙','☀️','⭐','🌈'],'⭐','De ster en de maan wisselen af.','⭐ 🌙'),
    q('2, 4, 6, ... Wat komt erna?',['7','8','9','10'],'8','Je telt steeds twee verder.','2 4 6'),
    q('🍎 🍎 🍌 🍎 🍎 Wat komt hierna?',['🍌','🍎','🥕','🍇'],'🍌','Twee appels, daarna een banaan.','🍎 🍎 🍌')]);
  L('g2-lettergrepen','g2','Klappen in woorden','👏','Taal','Verdeel woorden in klankstukjes.',[
    q('Hoeveel klapjes hoor je in bo-men?',['1','2','3','4'],'2','Bo-men heeft twee klankstukjes.','🌳'),
    q('Hoeveel klapjes hoor je in ka-tje?',['1','2','3','4'],'2','Ka-tje heeft twee stukjes.','🐱'),
    q('Welk woord heeft één klankstukje?',['Banaan','Tafel','Vis','Olifant'],'Vis','Vis spreek je in één stukje uit.','🐟'),
    q('Hoeveel klapjes in ba-naan?',['1','2','3','4'],'2','Ba-naan heeft twee lettergrepen.','🍌'),
    q('Welke heeft drie lettergrepen?',['Appel','Olifant','Pen','Stoel'],'Olifant','O-li-fant heeft drie klankstukjes.','🐘')]);
  L('g2-volgorde','g2','Eerst, dan, laatst','🧠','Wereld','Zet dingen in een logische volgorde.',[
    q('Wat doe je voordat je je tanden poetst?',['Tandpasta pakken','Naar school rennen','Schoenen aan','Een boek lezen'],'Tandpasta pakken','Eerst pak je je tandenborstel en tandpasta.','🪥'),
    q('Wat komt na de ochtend?',['Nacht','Middag','Gisteren','Winter'],'Middag','Na de ochtend komt de middag.','☀️'),
    q('Welk seizoen komt na de winter?',['Lente','Herfst','Winter','Zomer'],'Lente','Na de winter begint de lente.','🌷'),
    q('Wat komt direct na maandag?',['Donderdag','Vrijdag','Dinsdag','Zondag'],'Dinsdag','De week begint met maandag, dan dinsdag.','📅'),
    q('Wat doe je als eerste bij het planten?',['Bloem plukken','Zaadje planten','Fruit eten','Bladeren vegen'],'Zaadje planten','Eerst gaat het zaadje in de aarde.','🌱')]);
  L('g3-klanken','g3','Woorden bouwen','🔤','Taal','Maak woorden met letters en klanken.',[
    q('Welke letter ontbreekt in b_ek?',['i','o','a','u'],'o','B-o-e-k schrijf je als boek.','📖'),
    q('Welke letters maken het woord vis?',['v-i-s','w-i-s','v-e-s','f-i-s'],'v-i-s','V, i en s vormen vis.','🐟'),
    q('Welke letter ontbreekt in m_an?',['o','e','a','u'],'a','Maan heeft twee a’s achter elkaar.','🌙'),
    q('Welk woord heeft de klank oe?',['Boek','Vis','Kat','Pen'],'Boek','In boek hoor je de oe.','📚'),
    q('Welk woord eindigt op -en?',['Boom','Molen','Vis','Kat'],'Molen','Molen eindigt met en.','🌬️')]);
  L('g3-geld','g3','Winkeltje spelen','🪙','Rekenen','Reken met kleine bedragen.',[
    q('Je hebt €2 en krijgt €3. Hoeveel euro heb je?',['€4','€5','€6','€7'],'€5','2 plus 3 is 5 euro.','💶'),
    q('Een appel kost €1. Twee appels kosten...',['€1','€2','€3','€4'],'€2','Twee keer één euro is twee euro.','🍎🍎'),
    q('Je hebt €5. Je koopt iets van €2. Wat blijft over?',['€2','€4','€3','€1'],'€3','5 min 2 is 3 euro.','🛒'),
    q('Welke munten maken samen €2?',['€1 + €1','€1 + 50 cent','50 + 20 cent','10 + 10 cent'],'€1 + €1','Twee munten van 1 euro zijn 2 euro.','🪙'),
    q('Een pen kost €4. Je betaalt €5. Wat krijg je terug?',['€2','€3','€1','€0'],'€1','5 min 4 is 1 euro.','🖊️')]);
  L('g4-tijd','g4','Klokkijken','⏰','Rekenen','Ontdek uren, minuten en tijd.',[
    q('Hoeveel minuten zitten er in een uur?',['30','45','60','100'],'60','Een uur duurt zestig minuten.','🕒'),
    q('Wat is een half uur na 14:00?',['14:15','14:30','15:30','13:30'],'14:30','Een half uur is dertig minuten.','🕝'),
    q('Hoeveel uur van 9:00 tot 12:00?',['2','3','4','5'],'3','Van 9 tot 12 is drie uur.','⏱️'),
    q('Wat is kwart over drie?',['03:15','03:30','03:45','04:15'],'03:15','Kwart over is vijftien minuten na het uur.','🕒'),
    q('Hoeveel seconden zitten er in een minuut?',['30','100','24','60'],'60','In een minuut zitten 60 seconden.','⏲️')]);
  L('g4-zinnen','g4','Maak mooie zinnen','✍️','Taal','Leer hoofdletters en leestekens.',[
    q('Welke zin is goed geschreven?',['ik lees een boek.','Ik lees een boek.','Ik lees een boek','ik Lees Een Boek.'],'Ik lees een boek.','Een zin begint met een hoofdletter en eindigt met een punt.','📖'),
    q('Welk teken hoort bij een vraag?',['.','!',',','?'],'?','Een vraagzin eindigt met een vraagteken.','❓'),
    q('Welke letter moet groot in "sara fietst"?',['s','a','r','t'],'s','Een naam begint met een hoofdletter: Sara.','🚲'),
    q('Welke zin is een uitroep?',['Stop!','Waar ga je?','Ik lees.','Dagelijks fiets ik.'],'Stop!','Een uitroep kan eindigen met een uitroepteken.','❗'),
    q('Welke zin begint goed?',['morgen is het vrijdag.','Morgen is het vrijdag.','morgen Is het vrijdag.','MORgen is het vrijdag.'],'Morgen is het vrijdag.','De eerste letter van een zin is een hoofdletter.','☀️')]);
  L('g5-kaart','g5','Kaart & kompas','🧭','Wereld','Leer de windrichtingen en kaarten lezen.',[
    q('Waar komt de zon ongeveer op?',['Noord','Zuid','Oost','West'],'Oost','De zon komt in het oosten op.','🌅'),
    q('Welke richting ligt tegenover noord?',['West','Oost','Zuid','Noordoost'],'Zuid','Noord en zuid zijn tegenovergesteld.','🧭'),
    q('Wat laat een legenda op een kaart zien?',['Alleen namen','Uitleg van symbolen','De temperatuur','De tijd'],'Uitleg van symbolen','Een legenda legt kaarttekens uit.','🗺️'),
    q('Welke richting ligt tussen noord en oost?',['Zuidwest','Noordwest','Zuidoost','Noordoost'],'Noordoost','Noordoost ligt tussen noord en oost.','↗️'),
    q('Welke kant ligt tegenover west?',['Zuid','Oost','Noord','Zuidoost'],'Oost','West en oost zijn tegenovergesteld.','⬅️➡️')]);
  L('g5-taalfabriek','g5','Samenstellingen','🛠️','Taal','Maak lange woorden uit korte woorden.',[
    q('Welk woord is een samenstelling?',['Boekenkast','Mooi','Lopen','Groot'],'Boekenkast','Boeken + kast maken boekenkast.','📚'),
    q('Wat maak je met regen + jas?',['Jasregen','Regenjas','Jas','Regendag'],'Regenjas','Regen en jas vormen regenjas.','🌧️'),
    q('Welk woord past achter zonne-?',['Bril','Hand','Vis','Pen'],'Bril','Zonnebril is een samenstelling.','🕶️'),
    q('Wat is het eerste deel van voetbal?',['Bal','Voet','Voeten','Veld'],'Voet','Voetbal bestaat uit voet en bal.','⚽'),
    q('Welk woord ontstaat uit school + tas?',['Schooltas','Tasles','Schoolgang','Tasboek'],'Schooltas','Een schooltas neem je mee naar school.','🎒')]);
  L('g6-maten','g6','Meten is weten','📏','Rekenen','Reken met lengtes en gewichten.',[
    q('Hoeveel centimeter is 1 meter?',['10','100','1.000','50'],'100','Een meter is 100 centimeter.','📏'),
    q('Hoeveel gram is 1 kilogram?',['10','100','1.000','100.000'],'1.000','Een kilogram is duizend gram.','⚖️'),
    q('Hoeveel meter is 2,5 kilometer?',['250','2.500','25','2500.000'],'2.500','Een kilometer is duizend meter.','🚶'),
    q('Hoeveel liter zit in 500 milliliter?',['0,5 liter','5 liter','50 liter','0,05 liter'],'0,5 liter','500 milliliter is een halve liter.','🥤'),
    q('Hoeveel centimeter is 1,2 meter?',['12','120','1.200','102'],'120','1 meter is 100 cm; 0,2 meter is 20 cm.','📐')]);
  L('g6-woordenboek','g6','Woordenschat','📚','Taal','Leer betekenissen en tegenstellingen.',[
    q('Wat is het tegenovergestelde van dapper?',['Moedig','Bang','Sterk','Trots'],'Bang','Bang is het tegenovergestelde van dapper.','🦁'),
    q('Wat betekent nauwkeurig?',['Slordig','Precies','Heel snel','Heel stil'],'Precies','Nauwkeurig betekent heel precies.','🔍'),
    q('Welk woord betekent hetzelfde als vrolijk?',['Blij','Boos','Moe','Droevig'],'Blij','Vrolijk en blij zijn synoniemen.','😊'),
    q('Wat is een synoniem?',['Een tegenovergesteld woord','Een woord met dezelfde betekenis','Een getal','Een letter'],'Een woord met dezelfde betekenis','Synoniemen betekenen ongeveer hetzelfde.','📖'),
    q('Wat is het tegenovergestelde van vroeger?',['Vandaag','Later','Gisteren','Altijd'],'Later','Vroeger gaat over het verleden; later over de toekomst.','⏳')]);
  L('g7-data','g7','Grafieken lezen','📈','Rekenen','Begrijp tabellen en gemiddelden.',[
    q('Wat is het gemiddelde van 4, 6 en 8?',['5','6','7','8'],'6','4 + 6 + 8 = 18 en 18 gedeeld door 3 is 6.','📊'),
    q('Een klas heeft 12 meisjes en 13 jongens. Hoeveel kinderen?',['24','25','26','27'],'25','12 + 13 = 25.','🏫'),
    q('Welke waarde is het grootst?',['38','83','58','68'],'83','83 heeft de meeste tientallen.','📈'),
    q('Wat is de mediaan van 2, 4, 9?',['2','4','5','9'],'4','Het middelste getal is vier.','🔢'),
    q('Je verkoopt 5, 7 en 6 ijsjes. Hoeveel in totaal?',['17','19','20','18'],'18','5 + 7 + 6 = 18.','🍦')]);
  L('g7-spelling','g7','Werkwoorden oefenen','✏️','Taal','Kies de juiste werkwoordsvorm.',[
    q('Ik ... elke dag naar school.',['fietst','fiets','fietsen','fietste'],'fiets','Bij ik in tegenwoordige tijd hoort fiets.','🚴'),
    q('Hij ... een boek.',['leest','lees','lezen','lezenen'],'leest','Bij hij hoort meestal stam + t.','📖'),
    q('Wij ... samen.',['speelt','speel','spelen','speelde'],'spelen','Bij wij gebruik je het hele werkwoord.','⚽'),
    q('Gisteren ... ik naar huis.',['loop','loopt','liep','lopen'],'liep','Liep is verleden tijd van lopen.','👟'),
    q('Zij (meervoud) ... gisteren.',['fietste','fietsten','fietst','fiets'],'fietsten','Bij zij (meervoud) hoort fietsten in de verleden tijd.','🚲')]);
  L('g8-geld','g8','Slim met geld','💶','Rekenen','Bereken budget, korting en sparen.',[
    q('Je spaart €12 per week. Hoeveel in 5 weken?',['€48','€60','€72','€50'],'€60','Vijf keer twaalf euro is zestig euro.','🐷'),
    q('Wat is 20% van €150?',['€20','€25','€30','€35'],'€30','Tien procent is €15, twintig procent €30.','💸'),
    q('Je betaalt €18 van €25. Hoeveel houd je over?',['€5','€6','€7','€8'],'€7','25 - 18 = 7.','🛍️'),
    q('Een fiets van €200 kost na korting €160. Hoeveel procent korting?',['10%','15%','20%','25%'],'20%','€40 is één vijfde van €200, dus 20%.','🚲'),
    q('Je verdeelt €45 over 3 personen. Hoeveel elk?',['€10','€12','€15','€18'],'€15','45 gedeeld door 3 is 15.','👫')]);
  L('g8-digitaal','g8','Digitaal slim','🔐','Wereld','Leer veilig en slim omgaan met internet.',[
    q('Welk wachtwoord is doorgaans het sterkst?',['123456','welkom','Paarse!Fiets72','abcdef'],'Paarse!Fiets72','Een langer, minder voorspelbaar wachtwoord is veiliger.','🔑'),
    q('Een onbekende vraagt je adres in een chat. Wat doe je?',['Meteen sturen','Een volwassene vragen','Online zetten','Het delen met iedereen'],'Een volwassene vragen','Deel geen persoonlijke gegevens met onbekenden.','💬'),
    q('Wat is phishing?',['Een computerspel','Een poging gegevens te stelen met nepberichten','Een foto maken','Een zoekmachine'],'Een poging gegevens te stelen met nepberichten','Bij phishing doen oplichters zich voor als iemand anders.','🎣'),
    q('Welke bron controleer je voor nieuws?',['Alleen een gerucht','Een betrouwbare nieuwsbron','Een onbekende advertentie','Een willekeurige reactie'],'Een betrouwbare nieuwsbron','Vergelijk informatie met betrouwbare bronnen.','📰'),
    q('Wat doe je bij een nare online boodschap?',['Terug schelden','Bewaren en een vertrouwde volwassene vertellen','Blijven praten','Je wachtwoord delen'],'Bewaren en een vertrouwde volwassene vertellen','Vraag hulp en reageer niet op pesten.','💜')]);


  // Extra oefenlessen: één nieuwe les per leeftijdsgroep.
  L("p-lichaam","p","Mijn lichaam","🖐️","Ontdekken","Leer lichaamsdelen herkennen",[
    q("Waarmee ruik je?",["Je neus","Je knie","Je elleboog","Je voet"],"Je neus","Met je neus kun je ruiken.","👃"),
    q("Waarmee luister je?",["Je oren","Je tenen","Je haren","Je vingers"],"Je oren","Met je oren hoor je geluiden.","👂"),
    q("Waarmee kijk je?",["Je ogen","Je mond","Je handen","Je knieën"],"Je ogen","Met je ogen kun je zien.","👀"),
    q("Waarmee loop je?",["Je voeten","Je oren","Je neus","Je haar"],"Je voeten","Met je voeten kun je lopen.","👣"),
    q("Waarmee pak je een bal?",["Je handen","Je oren","Je neus","Je knieën"],"Je handen","Met je handen kun je iets vasthouden.","👐")
  ]);

  L("g1-tegenstellingen","g1","Tegenstellingen","↔️","Taal","Ontdek woorden die het tegenovergestelde betekenen",[
    q("Wat is het tegenovergestelde van groot?",["Klein","Breed","Lang","Zwaar"],"Klein","Groot en klein zijn tegenstellingen.","🐘 🐭"),
    q("Wat is het tegenovergestelde van warm?",["Koud","Heet","Lauw","Zonnig"],"Koud","Warm en koud zijn tegenstellingen.","☀️ ❄️"),
    q("Wat is het tegenovergestelde van blij?",["Verdrietig","Vrolijk","Lachend","Tevreden"],"Verdrietig","Blij en verdrietig zijn tegenstellingen.","😊 😢"),
    q("Wat is het tegenovergestelde van boven?",["Onder","Hoog","Naast","Ver"],"Onder","Boven en onder zijn tegenstellingen.","⬆️ ⬇️"),
    q("Wat is het tegenovergestelde van open?",["Dicht","Groot","Licht","Nieuw"],"Dicht","Open en dicht zijn tegenstellingen.","🚪")
  ]);

  L("g2-rijmwoorden","g2","Rijmwoorden zoeken","🎵","Taal","Welke woorden klinken hetzelfde aan het eind?",[
    q("Welk woord rijmt op kat?",["Mat","Kip","Vis","Huis"],"Mat","Kat en mat rijmen.","🐱"),
    q("Welk woord rijmt op boom?",["Droom","Bal","Tak","Zon"],"Droom","Boom en droom rijmen.","🌳"),
    q("Welk woord rijmt op muis?",["Huis","Maan","Boom","Vis"],"Huis","Muis en huis rijmen.","🐭"),
    q("Welk woord rijmt op zon?",["Ton","Zee","Bal","Raam"],"Ton","Zon en ton rijmen.","☀️"),
    q("Welk woord rijmt op beer?",["Peer","Kat","Hond","Kip"],"Peer","Beer en peer rijmen.","🐻 🍐")
  ]);

  L("g3-tientallen","g3","Tientallen en eenheden","🔢","Rekenen","Ontdek hoe getallen zijn opgebouwd",[
    q("Hoeveel is 2 tientallen en 3 eenheden?",["23","32","203","5"],"23","Twee tientallen zijn 20, plus 3 is 23.","🔢"),
    q("Hoeveel tientallen zitten er in 40?",["4","40","2","0"],"4","Vier keer tien is 40.","🔟"),
    q("Wat is 30 + 6?",["36","63","306","24"],"36","Dertig plus zes is zesendertig.","🧮"),
    q("Welk getal heeft 5 tientallen en 1 eenheid?",["51","15","501","6"],"51","Vijf tientallen zijn 50, plus 1 is 51.","🔢"),
    q("Hoeveel eenheden zitten er in 78 naast de 7 tientallen?",["8","7","78","70"],"8","78 bestaat uit 7 tientallen en 8 eenheden.","🧮")
  ]);

  L("g4-keer-en-delen","g4","Keer en deel","✖️","Rekenen","Oefen vermenigvuldigen en delen",[
    q("Hoeveel is 6 × 4?",["24","20","28","10"],"24","Zes groepjes van vier zijn 24.","✖️"),
    q("Hoeveel is 35 ÷ 5?",["7","6","8","5"],"7","Vijf keer zeven is 35.","➗"),
    q("Hoeveel is 8 × 3?",["24","21","32","11"],"24","Acht keer drie is 24.","✖️"),
    q("Hoeveel is 42 ÷ 6?",["7","8","6","9"],"7","Zes keer zeven is 42.","➗"),
    q("Hoeveel is 9 × 5?",["45","40","50","35"],"45","Negen keer vijf is 45.","✖️")
  ]);

  L("g5-kommageld","g5","Rekenen met euro's","💶","Rekenen","Tel bedragen met komma's bij elkaar op",[
    q("Hoeveel is € 2,50 + € 1,20?",["€ 3,70","€ 3,50","€ 4,20","€ 2,70"],"€ 3,70","2 euro 50 plus 1 euro 20 is 3 euro 70.","💶"),
    q("Je betaalt € 5 voor iets van € 3,75. Wat krijg je terug?",["€ 1,25","€ 2,25","€ 1,75","€ 0,75"],"€ 1,25","5 euro min 3 euro 75 is 1 euro 25.","🪙"),
    q("Hoeveel is € 4,50 + € 0,50?",["€ 5,00","€ 4,55","€ 4,00","€ 5,50"],"€ 5,00","Vijftig cent erbij maakt precies 5 euro.","💰"),
    q("Hoeveel is € 10,00 - € 2,40?",["€ 7,60","€ 8,60","€ 7,40","€ 6,60"],"€ 7,60","Tien euro min twee euro veertig is zeven euro zestig.","🛒"),
    q("Wat is duurder?",["€ 3,90","€ 3,09","€ 3,19","€ 3,49"],"€ 3,90","Negentig cent is meer dan negen, negentien of negenenveertig cent.","🏷️")
  ]);

  L("g6-verhoudingen","g6","Verhoudingen oefenen","⚖️","Rekenen","Ontdek verhoudingen met herkenbare voorbeelden",[
    q("Voor 2 glazen sap heb je 4 sinaasappels nodig. Hoeveel voor 4 glazen?",["8","6","4","10"],"8","Twee keer zoveel glazen betekent twee keer zoveel sinaasappels.","🍊"),
    q("Een recept voor 3 personen gebruikt 6 eieren. Hoeveel voor 6 personen?",["12","9","18","6"],"12","Zes personen is het dubbele van drie.","🥚"),
    q("Een fiets rijdt 10 km in 30 minuten. Hoe ver in 60 minuten bij dezelfde snelheid?",["20 km","15 km","30 km","10 km"],"20 km","Een uur is twee keer dertig minuten.","🚲"),
    q("In een klas zijn 2 meisjes per 3 jongens. Hoeveel meisjes bij 6 jongens in dezelfde verhouding?",["4","3","6","9"],"4","De verhouding 2 op 3 wordt 4 op 6.","👧"),
    q("Je mengt 1 deel siroop met 4 delen water. Hoeveel delen water bij 2 delen siroop?",["8","6","4","2"],"8","Je verdubbelt beide delen van de verhouding.","🥤")
  ]);

  L("g7-gemiddelde","g7","Gemiddelden berekenen","📊","Rekenen","Leer gemiddelden uitrekenen",[
    q("Wat is het gemiddelde van 4, 6 en 8?",["6","5","7","18"],"6","4 + 6 + 8 = 18. Deel door 3: 6.","📊"),
    q("Wat is het gemiddelde van 10 en 20?",["15","10","20","30"],"15","30 gedeeld door 2 is 15.","🧮"),
    q("Wat is het gemiddelde van 3, 3, 6 en 8?",["5","4","6","20"],"5","Samen 20, gedeeld door 4 is 5.","📈"),
    q("Wat is het gemiddelde van 7, 9 en 11?",["9","8","10","27"],"9","27 gedeeld door 3 is 9.","📊"),
    q("Wat is het gemiddelde van 12, 14, 16 en 18?",["15","14","16","60"],"15","60 gedeeld door 4 is 15.","🧮")
  ]);

  L("g8-schaal","g8","Schaal en afstand","🗺️","Rekenen","Reken met schaal op kaarten en tekeningen",[
    q("Op een kaart is 1 cm gelijk aan 1 km. Wat is 3 cm?",["3 km","30 km","300 m","1 km"],"3 km","Drie keer 1 kilometer is 3 kilometer.","🗺️"),
    q("Een plattegrond heeft schaal 1:100. Hoeveel is 2 cm in werkelijkheid?",["2 meter","20 meter","20 cm","200 meter"],"2 meter","2 × 100 cm = 200 cm, dus 2 meter.","📐"),
    q("Bij schaal 1:50 is 4 cm op papier hoeveel in werkelijkheid?",["2 meter","4 meter","50 cm","20 meter"],"2 meter","4 × 50 cm = 200 cm, dus 2 meter.","📏"),
    q("Op een kaart betekent 1 cm 5 km. Hoeveel is 4 cm?",["20 km","9 km","15 km","25 km"],"20 km","Vier keer vijf kilometer is twintig kilometer.","🚗"),
    q("Een tekening heeft schaal 1:10. Hoeveel is 6 cm in werkelijkheid?",["60 cm","6 cm","600 cm","16 cm"],"60 cm","Zes keer tien centimeter is zestig centimeter.","✏️")
  ]);

window.STERRENSTAP_DATA = {GROUPS, lessons};
})();
