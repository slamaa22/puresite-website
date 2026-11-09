import fs from 'node:fs';
import path from 'node:path';

const ARTICLES = [
  {
    slug: 'website-kaufen-graz',
    url: '/ratgeber/website-kaufen-graz/',
    category: 'Kaufberatung & Preise',
    readTime: '6 Min. Lesezeit',
    publishedAt: '2026-11-09',
    updatedAt: '2026-11-09',
    title:
      'Website kaufen in Graz & Steiermark: Preise, Ablauf & worauf Betriebe 2026 achten müssen',
    shortTitle: 'Website kaufen in Graz: Preise & Checkliste 2026',
    metaTitle: 'Website kaufen Graz & Steiermark | Festpreis ab 1.000 € — PureSite',
    metaDescription:
      'Website kaufen in Graz zum garantierten Festpreis ab 1.000 €: Worauf Betriebe beim Kauf einer Homepage achten müssen, Preisvergleich & 50/50 Zahlung.',
    keywords: [
      'Website kaufen Graz',
      'Websiten kaufen Graz',
      'Homepage kaufen Graz',
      'Website zum Festpreis kaufen',
      'Firmenwebsite kaufen Steiermark',
      'Webseite kaufen Österreich'
    ],
    excerpt:
      'Immer mehr Grazer Betriebe möchten eine fertige, verkaufsstarke Website zum garantierten Festpreis kaufen — statt monatelang offene Stundensätze zu bezahlen. Hier erfährst du, was eine moderne Website 2026 kostet und worauf du beim Kauf unbedingt achten musst.',
    keyTakeaways: [
      'Festpreis ab 1.000 € statt unkalkulierbarer Agentur-Stundensätze',
      '100 % Eigentum am Quellcode ohne monatliche Lizenz- oder Baukasten-Fesseln',
      'Ladezeiten unter 0,4 Sekunden sorgen für Top-Platzierungen bei Google in Graz',
      'Sichere 50/50-Zahlung: 50 % bei Projektstart, 50 % erst nach deiner Abnahme'
    ],
    sections: [
      {
        heading: '1. Warum „Website kaufen“ zum Festpreis das klassische Agenturmodell ablöst',
        paragraphs: [
          'Wer in Graz oder der Steiermark nach „Website kaufen Graz“ oder „Websiten kaufen Graz“ sucht, hat meist ein klares Ziel: Ein schlüsselfertiges, professionelles Aushängeschild im Internet, das zuverlässig neue Kundenanfragen bringt — ohne endloses Fachchinesisch und ohne explodierende Regie-Stunden.',
          'Während klassische Werbeagenturen häufig nach Aufwand abrechnen (oft zwischen 120 € und 180 € pro Stunde) und am Ende unvorhergesehene Nachzahlungen für Korrekturschleifen oder Plugins verlangen, kaufst du bei PureSite deine Website wie ein präzise kalkuliertes Produkt zum 100 % verbindlichen Festpreis.'
        ],
        bullets: [
          'Transparente Modul-Auswahl: Du siehst vorab auf den Euro genau, was Design, Unterseiten, SEO oder ein interaktiver Preisrechner kosten.',
          'Schlüsselfertige Übergabe in 2 bis 4 Wochen statt monatelanger Projektverzögerungen.',
          'Keine versteckten Plugin-Abos: Deine Website wird sauber programmiert und gehört nach Fertigstellung vollständig dir.'
        ],
        highlightBox: {
          title: 'Sofort-Orientierung im Online-Kalkulator',
          text: 'Bei PureSite startet eine vollwertige, handgeschriebene Business-Website bereits ab 1.000 € Festpreis — inklusive individuellem Design, Mobil-Optimierung, technischem Google-SEO und 30 Tagen Festpreisgarantie.'
        }
      },
      {
        heading: '2. Preisvergleich 2026: Baukasten vs. WordPress-Agentur vs. PureSite Festpreis',
        paragraphs: [
          'Wenn du in Graz eine Website kaufen möchtest, stehst du grundsätzlich vor drei Optionen: einem billigen Online-Baukasten (Wix, Jimdo), einer klassischen WordPress-Agentur oder einem modernen Software Studio wie PureSite.',
          'Gerade für etablierte Handwerksbetriebe, Dienstleister, Ärzte, Kanzleien und wachsende KMU in Graz entscheidet die technische Basis darüber, ob deine Seite auf Google vor der lokalen Konkurrenz gefunden wird oder auf Seite 3 verschwindet.'
        ],
        bullets: [
          'Homepage-Baukasten (20–40 €/Monat): Wirkt günstig, kostet dich aber dutzende eigene Arbeitsstunden, lädt auf Smartphones oft träge (3–5 Sekunden) und gehört dir nie wirklich.',
          'Klassische WordPress-Agentur (3.500 € – 8.000 €+): Hoher Agentur-Overhead, dutzende Drittanbieter-Plugins, laufender Update-Zwang und ständige Gefahr von Sicherheitslücken.',
          'PureSite Software Studio Graz (ab 1.000 € Festpreis): Maßgeschneiderter High-Speed-Code (< 0,4s Ladezeit), 100/100 Google Lighthouse Performance, 100 % DSGVO-konform ohne nervige Cookie-Banner und null Wartungszwang.'
        ]
      },
      {
        heading: '3. Die 5-Punkte-Checkliste: Worauf du beim Website-Kauf in Graz achten musst',
        paragraphs: [
          'Bevor du den Auftrag für deine neue Firmenwebsite vergibst, solltest du fünf entscheidende Qualitätskriterien prüfen. Viele Anbieter verkaufen vorgefertigte Standard-Templates als vermeintliche Maßarbeit.'
        ],
        bullets: [
          'Echte Ladezeit unter 1 Sekunde: Teste bestehende Referenzseiten des Anbieters mit Google PageSpeed Insights. PureSite-Websites erreichen konstant 99–100 Punkte.',
          'Lokale SEO-Architektur für Graz & Steiermark: Saubere HTML5-Struktur, lokale Schema.org-Auszeichnung (LocalBusiness) und gezielte regionale Keywords.',
          'DSGVO-Sicherheit ab Werk: Keine extern nachgeladenen Google Fonts, keine unzulässigen US-Tracker und kein aufgezwungener Cookie-Banner.',
          'Conversion-Fokus statt reiner Visitenkarte: Klare Handlungsaufforderungen (CTAs), interaktive Anfrageformulare, WhatsApp-Direktkontakt oder Online-Kalkulatoren.',
          'Faire Zahlungsmodalitäten: Zahle niemals 100 % im Voraus. Bei PureSite gilt das faire 50/50-Modell (50 % bei Start, 50 % erst bei erfolgreichem Livegang).'
        ]
      },
      {
        heading: '4. So läuft der Kauf deiner neuen Website bei PureSite in Graz ab',
        paragraphs: [
          'Wir sitzen direkt in Graz (Am Leopoldsgrund 19, 8055 Graz) und begleiten dich persönlich — ohne zwischengeschaltete Projektmanager oder Callcenter. Du sprichst direkt mit den Entwicklern Maximilian Schlacher und Loreno Zanaboni.',
          'Im ersten Schritt stellst du dir im Festpreis-Kalkulator deine Wunsch-Bausteine zusammen oder forderst ein kostenloses Erstgespräch an. Innerhalb von 7 Tagen siehst du bereits den ersten interaktiven Design-Prototypen deiner neuen Website. Erst wenn du zu 100 % begeistert bist, schalten wir deine Website unter deiner Domain live.'
        ]
      }
    ],
    faq: [
      {
        question: 'Was kostet es, bei PureSite in Graz eine fertige Website zu kaufen?',
        answer:
          'Eine komplett maßgeschneiderte, blitzschnelle Basis-Website inklusive individuellem Corporate Design, Mobil-Optimierung, Kontaktformular und technischem Google-SEO startet bei exakt 1.000 € Festpreis. Erweiterungen wie Unterseiten, interaktive Preisrechner oder ein eigenes Admin-Dashboard kannst du transparent im Kalkulator auswählen.'
      },
      {
        question: 'Gehört die gekaufte Website danach zu 100 % meinem Unternehmen?',
        answer:
          'Ja, vollständig. Nach Abschluss des Projekts erhältst du alle Rechte am Quellcode, den Texten und dem Design. Es gibt keinen Knebelvertrag und keine Lizenzgebühren.'
      },
      {
        question: 'Wie lange dauert es vom Kauf bis zum Livegang der Website?',
        answer:
          'Eine kompakte Unternehmenswebsite geht bei uns in der Regel innerhalb von 10 bis 14 Werktagen online. Umfangreichere Projekte mit individuellen Buchungssystemen oder Kalkulatoren dauern meist 3 bis 4 Wochen.'
      }
    ],
    ctaTitle: 'Bereit, deine neue Website zum garantierten Festpreis zu kalkulieren?',
    ctaSub:
      'Nutze unseren interaktiven Online-Kalkulator oder fordere direkt dein unverbindliches Festpreis-Angebot aus Graz an.'
  },
  {
    slug: 'website-agentur-graz',
    url: '/ratgeber/website-agentur-graz/',
    category: 'Agenturvergleich Graz',
    readTime: '7 Min. Lesezeit',
    publishedAt: '2026-11-09',
    updatedAt: '2026-11-09',
    title:
      'Website Agentur Graz vs. modernes Software Studio: Der ehrliche Vergleich für KMU (2026)',
    shortTitle: 'Website Agentur Graz: Worauf KMU achten sollten',
    metaTitle: 'Website Agentur Graz & Webagentur Steiermark | Vergleich 2026 — PureSite',
    metaDescription:
      'Auf der Suche nach einer Website Agentur in Graz (Webagentur / Webdesign Agentur)? Warum ein Grazer Software Studio schneller, günstiger & persönlicher ist.',
    keywords: [
      'Website Agentur Graz',
      'Website Argentur Graz',
      'Webagentur Graz',
      'Webdesign Agentur Graz',
      'Internetagentur Graz',
      'Webdesigner Graz Steiermark'
    ],
    excerpt:
      'Wer bei Google nach „Website Agentur Graz“, „Website Argentur Graz“ oder „Webagentur Graz“ sucht, wird von dutzenden Angeboten erschlagen. Wir zeigen dir, worin sich traditionelle Werbeagenturen von einem modernen Grazer Software Studio unterscheiden — und wie du tausende Euro Budget sparst.',
    keyTakeaways: [
      'Direkter Kontakt zu den Entwicklern in Graz statt teurem Agentur-Wasserkopf',
      'Moderne Software-Architektur (React/TypeScript) statt schwerfälliger WordPress-Templates',
      'Verbindliche Festpreise ab 1.000 € statt offener Stundensätze von 150 €/h',
      'Messbar mehr Kundenanfragen durch < 0,4s Ladezeit und verkaufspsychologischen Aufbau'
    ],
    sections: [
      {
        heading: '1. Das Problem mit klassischen Website-Agenturen in Graz',
        paragraphs: [
          'Egal ob du nach „Website Agentur Graz“, „Webdesign Agentur Graz“ oder versehentlich nach „Website Argentur Graz“ suchst: Die meisten Treffer führen zu klassischen Full-Service-Werbeagenturen. Diese Agenturen leisten oft gute Arbeit bei großen Printkampagnen, arbeiten bei Websites für kleine und mittlere Unternehmen (KMU) jedoch häufig mit veralteten Strukturen.',
          'Bei einer traditionellen Webagentur bezahlst du mit deinem Projektbudget nicht nur die eigentliche Programmierung, sondern auch Account-Manager, repräsentative Innenstadt-Büros und endlose Abstimmungsmeetings. Am Ende landet dein Projekt oft trotzdem in einem vorgekauften 60-Euro-WordPress-Theme.'
        ],
        bullets: [
          'Hohe Einstiegspreise: Klassische Agenturen in Graz starten selten unter 4.000 € bis 6.000 € für eine einfache Firmenwebsite.',
          'Lange Durchlaufzeiten: Durch viele Zwischenstationen dauert ein Relaunch oft 3 bis 6 Monate.',
          'Abhängigkeit nach dem Launch: Für jede kleine Textänderung oder jedes Sicherheits-Update werden teure Wartungspauschalen fällig.'
        ]
      },
      {
        heading: '2. Was macht PureSite als Grazer Software Studio anders?',
        paragraphs: [
          'PureSite wurde von Maximilian Schlacher und Loreno Zanaboni in Graz gegründet, um genau diese Lücke für österreichische Betriebe zu schließen: Wir kombinieren die gestalterische Exzellenz einer Premium-Designagentur mit der technischen Präzision eines modernen Software Studios.',
          'Statt aufgeblähter Baukastensysteme entwickeln wir Websites mit denselben modernen Web-Technologien (React, TypeScript, Vite), auf die auch führende Technologieunternehmen setzen. Das Ergebnis spürt jeder Besucher in der ersten Zehntelsekunde: Seiten öffnen sich verzögerungsfrei mit 60 Bildern pro Sekunde.'
        ],
        highlightBox: {
          title: 'Persönlich in 8055 Graz — direkt von Entwickler zu Unternehmer',
          text: 'Bei uns gibt es kein Stille-Post-Prinzip. Du sprichst direkt mit den beiden Gründern, die deine Website konzipieren, designen und programmieren. Das spart bis zu 60 % der üblichen Agenturkosten.'
        }
      },
      {
        heading: '3. Direktvergleich: Klassische Webagentur Graz vs. PureSite Software Studio',
        paragraphs: [
          'Damit du für dein Unternehmen in Graz oder der Steiermark die richtige Entscheidung triffst, lohnt sich ein nüchterner Blick auf die Fakten:'
        ],
        bullets: [
          'Preismodell: Klassische Website Agentur = Schätzangebot nach Stunden (oft Nachforderungen) | PureSite = 100 % garantierter Festpreis ab 1.000 € vor Projektstart.',
          'Technologie: Klassische Agentur = WordPress / Elementor / Typo3 mit 20+ Plugins | PureSite = Handgeschriebener Clean-Code ohne Sicherheitslücken.',
          'Ladezeit (Mobil): Klassische Agentur = meist 2,5 bis 5,5 Sekunden | PureSite = unter 0,4 Sekunden (Google Lighthouse Score 99–100/100).',
          'DSGVO & Cookies: Klassische Agentur = komplexe Cookie-Banner nötig | PureSite = 100 % cookieless & DSGVO-konform ab Werk.',
          'Betreuung: Klassische Agentur = Ticket-System & teure Stundensätze | PureSite = Direkter WhatsApp/Telefon-Draht (+43 676 6500468) & optionale Flatrate inkl. Änderungszeit.'
        ]
      },
      {
        heading: '4. Für welche Unternehmen in Graz & der Steiermark eignet sich PureSite?',
        paragraphs: [
          'Unsere Kunden sind Handwerksbetriebe, Bau- und Technikunternehmen, Dienstleister, Steuerberater, Ärzte, Gastronomiebetriebe sowie ambitionierte Startups im Raum Graz, Graz-Umgebung, Leibnitz, Weiz, Voitsberg und der gesamten Steiermark.',
          'Überall dort, wo eine Website nicht nur „schön aussehen“, sondern messbar Vertrauen aufbauen, qualifizierte Kundenanfragen generieren oder neue Mitarbeiter gewinnen soll, liefert unsere modulare Festpreis-Architektur den schnellsten Return on Investment (ROI).'
        ]
      }
    ],
    faq: [
      {
        question: 'Seid ihr eine lokale Website Agentur direkt in Graz?',
        answer:
          'Ja! Unser Studio befindet sich Am Leopoldsgrund 19 in 8055 Graz. Wir betreuen Kunden persönlich in Graz, der gesamten Steiermark sowie digital in ganz Österreich.'
      },
      {
        question: 'Kann ich meine Website später auch selbst bearbeiten, ohne euch zu fragen?',
        answer:
          'Selbstverständlich. Auf Wunsch integrieren wir unser schlankes Admin-Dashboard (CMS-Modul), über das du Texte, Bilder, Preise oder News jederzeit kinderleicht selbst anpassen kannst — ganz ohne Programmierkenntnisse.'
      },
      {
        question: 'Übernehmt ihr auch Texte, Fotos und die Google-Maps-Einrichtung?',
        answer:
          'Ja. Mit unseren Content- und Local-SEO-Modulen übernehmen wir die verkaufsstarke Texterstellung (Copywriting) sowie die komplette Optimierung deines Google Unternehmensprofils für maximale Sichtbarkeit in Graz.'
      }
    ],
    ctaTitle: 'Lerne deine Grazer Webdesign-Partner persönlich kennen',
    ctaSub:
      'Kalkuliere dein Projekt in 60 Sekunden online oder vereinbare ein unverbindliches Erstgespräch mit Maximilian & Loreno.'
  },
  {
    slug: 'homepage-erstellen-lassen-graz-kosten',
    url: '/ratgeber/homepage-erstellen-lassen-graz-kosten/',
    category: 'Preise & Kalkulation',
    readTime: '6 Min. Lesezeit',
    publishedAt: '2026-11-09',
    updatedAt: '2026-11-09',
    title:
      'Homepage erstellen lassen in Graz: Was kostet eine professionelle Website 2026 wirklich?',
    shortTitle: 'Homepage erstellen lassen Graz: Alle Kosten 2026',
    metaTitle: 'Homepage erstellen lassen Graz: Kosten & Preise 2026 | PureSite',
    metaDescription:
      'Was kostet es, eine Homepage in Graz erstellen zu lassen? Ehrliche Preisübersicht 2026 für Österreich: Onepager ab 1.000 €, KMU-Websites & laufende Kosten.',
    keywords: [
      'Homepage erstellen lassen Graz',
      'Website erstellen lassen Kosten',
      'Was kostet eine Website Österreich',
      'Webdesign Preise Graz',
      'Homepage Preis Steiermark',
      'Webseite erstellen lassen Graz'
    ],
    excerpt:
      '„Was kostet eine professionelle Homepage in Graz?“ — Kaum eine Frage wird im Webdesign so oft mit „Das kommt darauf an“ abgewimmelt. Wir brechen mit dem Geheimnis um Agenturpreise und zeigen dir alle realen Kosten für 2026 schwarz auf weiß.',
    keyTakeaways: [
      'Komplette Business-Website in Graz ab 1.000 € Festpreis realisierbar',
      'Mehrseitige KMU-Websites mit SEO & Spezialfunktionen liegen meist zwischen 1.400 € und 2.800 €',
      'Keine laufenden Lizenzkosten für Themes oder kostenpflichtige WordPress-Plugins',
      'Volle Preistransparenz durch unseren öffentlich zugänglichen Online-Kalkulator'
    ],
    sections: [
      {
        heading: '1. Warum die meisten Webdesigner ihre Preise verstecken',
        paragraphs: [
          'Wenn du auf den Websites klassischer Agenturen in Graz oder Wien nach einer konkreten Preisliste suchst, findest du fast immer nur ein Kontaktformular mit dem Hinweis „Individuelles Angebot auf Anfrage“. Dahinter steckt selten technische Notwendigkeit, sondern meist Preispsychologie: Der Preis wird nach dem geschätzten Budget des Kunden festgelegt.',
          'Bei PureSite glauben wir an radikale Transparenz. Deshalb ist unser kompletter Modul-Katalog mit allen Einzelpreisen öffentlich auf unserer Website einsehbar.'
        ]
      },
      {
        heading: '2. Die 3 typischen Preisklassen beim Homepage-Erstellen-Lassen in Österreich (2026)',
        paragraphs: [
          'Je nach Umfang und Zielsetzung deines Betriebs lässt sich eine professionelle Website in drei klare Pakete einteilen:'
        ],
        bullets: [
          'Paket 1 — Der leistungsstarke Business-Start (ab 1.000 € Festpreis): Ideal für Dienstleister, lokale Betriebe, Einzelunternehmer und Neugründer in Graz. Enthält individuelles Design, blitzschnelle Umsetzung, Mobil-Optimierung, Kontaktformular, Impressum/DSGVO-Setup und technisches Basis-SEO.',
          'Paket 2 — Die wachstumsorientierte KMU-Website (ca. 1.450 € – 2.500 € Festpreis): Für etablierte Unternehmen mit mehreren Leistungsbereichen, zusätzlichen Unterseiten, professionellem Copywriting, Google-Maps/Local-SEO-Paket, interaktiven Vorher/Nachher-Galerien oder Kundenbewertungen.',
          'Paket 3 — Interaktive Web-Plattform & Digitalisierung (ca. 2.500 € – 4.200 € Festpreis): Inklusive maßgeschneidertem Online-Preiskalkulator, Bewerber-Funnel gegen den Fachkräftemangel, Online-Terminbuchung, Mehrsprachigkeit (DE/EN/IT) und eigenem Admin-Dashboard.'
        ],
        highlightBox: {
          title: 'Rechenbeispiel aus der Praxis',
          text: 'Gewinnt ein Grazer Handwerks- oder Dienstleistungsbetrieb über seine neue 1.500-Euro-Website nur zwei bis drei zusätzliche Aufträge im ersten Quartal, hat sich die gesamte Investition bereits mehrfach amortisiert.'
        }
      },
      {
        heading: '3. Einmalige Kosten vs. laufende Kosten (Hosting & Wartung)',
        paragraphs: [
          'Ein häufig unterschätzter Kostenblock beim „Homepage erstellen lassen“ sind die Folgekosten nach dem Launch. Bei klassischen WordPress-Seiten summieren sich Hosting, Premium-Plugins (WP Rocket, Elementor Pro, Security-Plugins) und Agentur-Wartungsverträge schnell auf 1.200 € bis 2.500 € pro Jahr.',
          'Da PureSite-Websites statisch kompiliert und frei von anfälligen Datenbank-Plugins sind, gibt es keinen technischen Wartungszwang. Du kannst deine Website auf jedem eigenen Server betreiben (0 € Bindung an uns) oder unser optionales Dedicated-EU-Hosting-Paket (ab 39 €/Monat) wählen, in dem bereits bis zu 3 Stunden persönliche Text- und Bildänderungen auf Zuruf pro Monat enthalten sind!'
        ]
      },
      {
        heading: '4. 50/50-Zahlungsziel & 30 Tage Festpreisgarantie',
        paragraphs: [
          'Sicherheit steht bei uns an erster Stelle: Wenn du deine Konfiguration im PureSite-Rechner zusammenstellst, garantieren wir dir diesen Festpreis für volle 30 Tage. Bei Auftragserteilung zahlst du lediglich 50 % Anzahlung zum Projektstart und die restlichen 50 % erst dann, wenn deine neue Homepage fix und fertig abgenommen ist und live geht.'
        ]
      }
    ],
    faq: [
      {
        question: 'Gibt es beim Festpreis von PureSite wirklich keine versteckten Zusatzkosten?',
        answer:
          'Nein. Der im Angebot vereinbarte Preis ist zu 100 % verbindlich. Alle gewählten Module, das responsive Design für Smartphone & Desktop sowie der gemeinsame Feinschliff vor dem Livegang sind komplett enthalten.'
      },
      {
        question: 'Muss ich einen monatlichen Wartungsvertrag abschließen?',
        answer:
          'Nein! Es gibt bei uns keinerlei Vertragsbindung. Unser Hosting- & Betreuungs-Paket ist zu 100 % freiwillig und monatlich kündbar. Du kannst deine Website jederzeit auch auf deinem eigenen Webspace betreiben.'
      },
      {
        question: 'Wie schnell erhalte ich ein schriftliches Festpreis-Angebot?',
        answer:
          'Über unseren Online-Kalkulator kannst du dir dein personalisiertes Angebot sofort als fertiges PDF herunterladen. Zusätzlich prüfen wir deine Anfrage persönlich und melden uns innerhalb von 24 Stunden bei dir.'
      }
    ],
    ctaTitle: 'Berechne jetzt den exakten Festpreis für deine Wunsch-Homepage',
    ctaSub:
      'Wähle deine benötigten Bausteine live aus und lade dir dein verbindliches PDF-Angebot sofort herunter.'
  },
  {
    slug: 'wordpress-alternative-graz-relaunch',
    url: '/ratgeber/wordpress-alternative-graz-relaunch/',
    category: 'Technik & Relaunch',
    readTime: '5 Min. Lesezeit',
    publishedAt: '2026-11-09',
    updatedAt: '2026-11-09',
    title:
      'Website Relaunch in Graz: Warum langsame WordPress-Seiten bis zu 40 % der Kundenanfragen kosten',
    shortTitle: 'Website Relaunch & WordPress-Alternative Graz',
    metaTitle: 'Website Relaunch Graz & WordPress Alternative | < 0,4s Ladezeit — PureSite',
    metaDescription:
      'Deine WordPress-Website ist langsam, veraltet oder bringt keine Anfragen? So gelingt der Website Relaunch in Graz mit unter 0,4s Ladezeit & Top-Google-Ranking.',
    keywords: [
      'Website Relaunch Graz',
      'WordPress Alternative Graz',
      'Homepage modernisieren Steiermark',
      'schnelle Website programmieren lassen Graz',
      'PageSpeed Optimierung Graz',
      'Webdesign Modernisierung Graz'
    ],
    excerpt:
      'Über 70 % aller Unternehmenswebsites in der Steiermark laufen auf veralteten WordPress-Installationen mit Ladezeiten von über 3 Sekunden. Warum Google langsame Seiten abstraft und wie ein moderner Relaunch sofort mehr Anfragen bringt.',
    keyTakeaways: [
      '53 % aller Smartphone-Nutzer brechen den Besuch ab, wenn eine Website länger als 3 Sekunden lädt',
      'Google Core Web Vitals bevorzugen extrem schnelle Websites (< 0,4s Ladezeit) im lokalen Ranking',
      'Kein Plugin-Chaos, keine Hacker-Angriffe auf wp-admin und keine kaputten Layouts nach Updates',
      'Nahtloser Relaunch ohne Ranking-Verlust durch saubere 301-Weiterleitungen deiner alten URLs'
    ],
    sections: [
      {
        heading: '1. Die stille Umsatzbremse: Warum alte WordPress-Seiten Kunden vergraulen',
        paragraphs: [
          'Stell dir vor, ein potenzieller Kunde in Graz sucht auf seinem Smartphone nach deiner Dienstleistung, klickt auf deine Website — und sieht drei Sekunden lang einen weißen Bildschirm, gefolgt von einem riesigen Cookie-Banner, der das halbe Display verdeckt. Laut Studien von Google klicken mehr als die Hälfte dieser Besucher sofort auf „Zurück“ und rufen stattdessen deinen Mitbewerber an.',
          'Der Grund liegt fast immer in der veralteten Architektur: Klassische WordPress-Websites mit Page-Buildern wie Elementor, Divi oder WPBakery müssen bei jedem einzelnen Seitenaufruf dutzende Datenbankabfragen, externe Skripte und riesige CSS-Dateien laden.'
        ]
      },
      {
        heading: '2. Warum moderner Handcode (React & TypeScript) die beste WordPress-Alternative ist',
        paragraphs: [
          'Bei einem Website Relaunch mit PureSite ersetzen wir das schwerfällige Baukasten-System durch handgeschriebene, hochoptimierte Software-Architektur. Deine Website wird vorab in hochkomprimierten Code übersetzt, der ohne Datenbank-Verzögerung direkt an den Browser ausgeliefert wird.',
          'Das Resultat ist ein messbarer Wettbewerbsvorteil für deinen Betrieb in Graz und der Steiermark:'
        ],
        bullets: [
          'Ladezeit unter 0,4 Sekunden: Deine Seite ist sofort da — selbst im mobilen Datennetz unterwegs.',
          'Maximale Sicherheit: Da es kein klassisches /wp-admin Login und keine veralteten Drittanbieter-Plugins gibt, bieten wir Angreifern und Bots schlichtweg keine Angriffsfläche.',
          '100 % DSGVO-konform ohne Cookie-Wand: Alle Schriften und Assets liegen lokal auf europäischen Servern. Deine Besucher sehen sofort dein Angebot statt lästiger Zustimmungs-Popups.',
          'Interaktive Erlebnisse mit 60fps: Flüssige Animationen, Live-Rechner und interaktive Komponenten schaffen sofort Vertrauen in deine Professionalität.'
        ],
        highlightBox: {
          title: 'Live testen im PureSite Speed-Lab',
          text: 'Auf unserer Startseite kannst du im interaktiven Speed-Lab live vergleichen, wie schnell eine PureSite-Architektur (0,4s) im Vergleich zu einer typischen WordPress-Agenturseite (3,8s) lädt.'
        }
      },
      {
        heading: '3. Sicherer Website Relaunch ohne Verlust bestehender Google-Rankings',
        paragraphs: [
          'Viele Unternehmer scheuen einen Relaunch, weil sie Angst haben, ihre bestehende Domain oder bisherige Google-Platzierungen zu verlieren. Bei PureSite läuft die Modernisierung nach einem strengen SEO-Migrationsprotokoll ab:',
          'Wir übernehmen deine bestehende Domain nahtlos, richten für alle bisherigen Unterseiten saubere 301-Weiterleitungen ein, optimieren sämtliche Meta-Titel, Überschriften (H1–H3) sowie Schema.org-Daten auf deine wichtigsten Keywords in Graz und reichen die neue Sitemap direkt in der Google Search Console und bei Bing Webmaster Tools ein.'
        ]
      }
    ],
    faq: [
      {
        question: 'Behalte ich bei einem Website Relaunch meine bisherige Domain und E-Mail-Adressen?',
        answer:
          'Ja, zu 100 %. Deine bestehende Domain (z. B. deine-firma.at) sowie alle eingerichteten E-Mail-Postfächer bleiben unverändert bestehen. Die Umschaltung auf die neue Website erfolgt unterbrechungsfrei innerhalb weniger Minuten.'
      },
      {
        question: 'Könnt ihr bestehende Texte und Bilder von meiner alten Homepage übernehmen?',
        answer:
          'Ja. Wir sichten deine bestehenden Inhalte, übernehmen Bewährtes, komprimieren deine Bilder ins moderne WebP-Format und überarbeiten deine Texte auf Wunsch verkaufspsychologisch und SEO-optimiert.'
      },
      {
        question: 'Was kostet ein kompletter Website Relaunch bei PureSite in Graz?',
        answer:
          'Genau wie bei einer Neuerstellung gilt unser transparenter Festpreis ab 1.000 € für das Basis-System. Die Übernahme deiner Domain und die technische SEO-Grundausstattung sind bereits im Basispreis inkludiert.'
      }
    ],
    ctaTitle: 'Zeit für einen modernen Website Relaunch in Graz?',
    ctaSub:
      'Lass uns deine bestehende Website kostenlos analysieren oder berechne deinen Relaunch-Festpreis direkt online.'
  }
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderArticleHtml(article) {
  const canonicalUrl = `https://puresite.at${article.url}`;
  const otherArticles = ARTICLES.filter(a => a.slug !== article.slug);

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: article.title,
        description: article.metaDescription,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: 'de-AT',
        keywords: article.keywords.join(', '),
        author: [
          {
            '@type': 'Person',
            name: 'Maximilian Schlacher'
          },
          {
            '@type': 'Person',
            name: 'Loreno Zanaboni'
          }
        ],
        publisher: {
          '@type': 'Organization',
          name: 'PureSite Software Studio',
          url: 'https://puresite.at/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://puresite.at/assets/puresite-logo-dark-stroke.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Startseite (Webdesign Graz)',
            item: 'https://puresite.at/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Ratgeber',
            item: 'https://puresite.at/ratgeber/'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.shortTitle,
            item: canonicalUrl
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: article.faq.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      }
    ]
  });

  return `<!doctype html>
<html lang="de-AT" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(article.metaTitle)}</title>
  <meta name="description" content="${escapeHtml(article.metaDescription)}" />
  <meta name="keywords" content="${escapeHtml(article.keywords.join(', '))}" />
  <meta name="author" content="PureSite — Maximilian Schlacher &amp; Loreno Zanaboni" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <meta name="geo.region" content="AT-6" />
  <meta name="geo.placename" content="Graz, Steiermark" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" href="/favicon.ico" sizes="48x48" />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="de_AT" />
  <meta property="og:site_name" content="PureSite Software Studio Graz" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${escapeHtml(article.metaTitle)}" />
  <meta property="og:description" content="${escapeHtml(article.metaDescription)}" />
  <meta property="og:image" content="https://puresite.at/assets/og-image.jpg" />
  <script type="application/ld+json">${schemaJson}</script>
  <style>
    :root {
      --bg: #070b12;
      --panel: rgba(16, 23, 38, 0.78);
      --border: rgba(255, 255, 255, 0.11);
      --text: #f8fafc;
      --muted: #94a3b8;
      --mint: #58fca5;
      --cyan: #38bdf8;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.12), transparent 45%),
                  radial-gradient(circle at 80% 10%, rgba(88, 252, 165, 0.1), transparent 45%),
                  var(--bg);
      color: var(--text);
      line-height: 1.68;
    }
    a { color: var(--mint); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .topbar {
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(18px);
      background: rgba(7, 11, 18, 0.85);
      border-bottom: 1px solid var(--border);
    }
    .topbar-inner {
      max-width: 1080px;
      margin: 0 auto;
      padding: 0.9rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      color: var(--text);
      font-weight: 800;
      font-size: 1.1rem;
      text-decoration: none !important;
    }
    .brand img { width: 34px; height: 34px; border-radius: 8px; }
    .nav-actions { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.6rem 1.1rem;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.88rem;
      text-decoration: none !important;
      transition: transform 0.2s ease;
    }
    .btn:hover { transform: translateY(-1px); }
    .btn-primary {
      background: linear-gradient(135deg, #58fca5, #38bdf8);
      color: #041019;
    }
    .btn-outline {
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.04);
      color: var(--text);
    }
    .container {
      max-width: 860px;
      margin: 0 auto;
      padding: 2.5rem 1.25rem 4rem;
    }
    .breadcrumb {
      font-size: 0.84rem;
      color: var(--muted);
      margin-bottom: 1.25rem;
    }
    .badge {
      display: inline-block;
      padding: 0.28rem 0.75rem;
      border-radius: 999px;
      background: rgba(88, 252, 165, 0.13);
      border: 1px solid rgba(88, 252, 165, 0.3);
      color: var(--mint);
      font-size: 0.76rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.85rem;
    }
    h1 {
      font-size: clamp(1.75rem, 3.8vw, 2.55rem);
      line-height: 1.22;
      margin: 0 0 1rem 0;
      letter-spacing: -0.02em;
    }
    .lead {
      font-size: 1.12rem;
      color: #cbd5e1;
      margin-bottom: 1.75rem;
    }
    .takeaways {
      background: rgba(88, 252, 165, 0.06);
      border: 1px solid rgba(88, 252, 165, 0.24);
      border-radius: 18px;
      padding: 1.35rem 1.5rem;
      margin-bottom: 2.25rem;
    }
    .takeaways h2 {
      font-size: 1.02rem;
      color: var(--mint);
      margin: 0 0 0.75rem 0;
    }
    .takeaways ul {
      margin: 0;
      padding-left: 1.2rem;
    }
    .takeaways li {
      margin-bottom: 0.45rem;
      color: var(--text);
    }
    .section-block {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 1.65rem;
      margin-bottom: 1.5rem;
    }
    .section-block h2 {
      font-size: 1.32rem;
      margin: 0 0 0.85rem 0;
      color: var(--text);
    }
    .section-block p {
      color: #cbd5e1;
      margin: 0 0 0.9rem 0;
    }
    .section-block ul {
      padding-left: 1.25rem;
      margin: 0.75rem 0;
    }
    .section-block li {
      margin-bottom: 0.55rem;
      color: var(--text);
    }
    .highlight {
      margin-top: 1rem;
      padding: 1rem 1.2rem;
      border-left: 3px solid var(--mint);
      background: rgba(255, 255, 255, 0.04);
      border-radius: 12px;
    }
    .faq-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 1.15rem 1.3rem;
      margin-bottom: 0.9rem;
    }
    .faq-card h3 {
      font-size: 1.02rem;
      margin: 0 0 0.45rem 0;
    }
    .faq-card p {
      margin: 0;
      color: #cbd5e1;
      font-size: 0.94rem;
    }
    .cta-box {
      margin-top: 2.5rem;
      padding: 2rem;
      border-radius: 22px;
      background: linear-gradient(135deg, rgba(88, 252, 165, 0.14), rgba(56, 189, 248, 0.1));
      border: 1px solid rgba(88, 252, 165, 0.35);
      text-align: center;
    }
    .cta-box h2 { margin: 0 0 0.5rem 0; font-size: 1.5rem; }
    .cta-box p { color: #cbd5e1; margin: 0 0 1.35rem 0; }
    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .related-card {
      display: block;
      padding: 1.15rem;
      border-radius: 14px;
      background: var(--panel);
      border: 1px solid var(--border);
      color: var(--text);
      text-decoration: none !important;
    }
    .related-card:hover { border-color: var(--mint); }
    footer {
      border-top: 1px solid var(--border);
      padding: 2rem 1.25rem;
      text-align: center;
      color: var(--muted);
      font-size: 0.86rem;
    }
  </style>
</head>
<body>
  <header class="topbar">
    <div class="topbar-inner">
      <a href="https://puresite.at/" class="brand">
        <img src="/assets/puresite-logo.png" alt="PureSite Logo" />
        <span>puresite · Webdesign Graz</span>
      </a>
      <div class="nav-actions">
        <a href="https://puresite.at/ratgeber/" class="btn btn-outline">Alle Ratgeber</a>
        <a href="https://puresite.at/#preise" class="btn btn-primary">Festpreis-Kalkulator (ab 1.000 €) ↗</a>
      </div>
    </div>
  </header>

  <main class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="https://puresite.at/">PureSite Graz</a> › <a href="https://puresite.at/ratgeber/">Ratgeber</a> › <span>${escapeHtml(article.shortTitle)}</span>
    </nav>

    <article>
      <span class="badge">${escapeHtml(article.category)} · ${escapeHtml(article.readTime)}</span>
      <h1>${escapeHtml(article.title)}</h1>
      <p class="lead">${escapeHtml(article.excerpt)}</p>

      <div class="takeaways">
        <h2>Das Wichtigste auf einen Blick</h2>
        <ul>
          ${article.keyTakeaways.map(t => `<li>${escapeHtml(t)}</li>`).join('\n          ')}
        </ul>
      </div>

      ${article.sections
        .map(
          sec => `
      <section class="section-block">
        <h2>${escapeHtml(sec.heading)}</h2>
        ${sec.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('\n        ')}
        ${
          sec.bullets
            ? `<ul>\n          ${sec.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('\n          ')}\n        </ul>`
            : ''
        }
        ${
          sec.highlightBox
            ? `<div class="highlight"><strong>${escapeHtml(sec.highlightBox.title)}</strong><br/><span>${escapeHtml(sec.highlightBox.text)}</span></div>`
            : ''
        }
      </section>`
        )
        .join('\n')}

      <section style="margin-top: 2.25rem;">
        <h2>Häufig gestellte Fragen (FAQ)</h2>
        ${article.faq
          .map(
            f => `
        <div class="faq-card">
          <h3>${escapeHtml(f.question)}</h3>
          <p>${escapeHtml(f.answer)}</p>
        </div>`
          )
          .join('\n')}
      </section>

      <div class="cta-box">
        <h2>${escapeHtml(article.ctaTitle)}</h2>
        <p>${escapeHtml(article.ctaSub)}</p>
        <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap;">
          <a href="https://puresite.at/#preise" class="btn btn-primary">Jetzt Website-Preis online kalkulieren ↗</a>
          <a href="tel:+436766500468" class="btn btn-outline">Direkt anrufen: +43 676 6500468</a>
        </div>
      </div>

      <section style="margin-top: 2.75rem;">
        <h2>Weitere Ratgeber für Unternehmen in Graz &amp; der Steiermark</h2>
        <div class="related-grid">
          ${otherArticles
            .map(
              oa => `
          <a href="${oa.url}" class="related-card">
            <small style="color:var(--mint); font-weight:700;">${escapeHtml(oa.category)}</small>
            <h3 style="margin:0.4rem 0; font-size:1rem;">${escapeHtml(oa.shortTitle)}</h3>
            <span style="font-size:0.84rem; color:var(--muted);">Artikel lesen →</span>
          </a>`
            )
            .join('\n')}
        </div>
      </section>
    </article>
  </main>

  <footer>
    <p>© 2026 PureSite Software Studio · Maximilian Schlacher &amp; Loreno Zanaboni · Am Leopoldsgrund 19, 8055 Graz · <a href="mailto:maximilian.schlacher@outlook.com">maximilian.schlacher@outlook.com</a></p>
    <p><a href="https://puresite.at/">Zurück zur Startseite &amp; den 18 Live-Demos</a></p>
  </footer>
</body>
</html>`;
}

function renderHubHtml() {
  const canonicalUrl = 'https://puresite.at/ratgeber/';
  return `<!doctype html>
<html lang="de-AT" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Webdesign Ratgeber Graz &amp; Steiermark: Website kaufen, Preise &amp; Agentur-Vergleich | PureSite</title>
  <meta name="description" content="Praxis-Ratgeber für Unternehmen in Graz &amp; Steiermark: Website kaufen zum Festpreis, Website Agentur Graz Vergleich, Homepage Kosten 2026 &amp; Relaunch." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" href="/favicon.ico" sizes="48x48" />
  <style>
    :root {
      --bg: #070b12;
      --panel: rgba(16, 23, 38, 0.8);
      --border: rgba(255, 255, 255, 0.11);
      --text: #f8fafc;
      --muted: #94a3b8;
      --mint: #58fca5;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.65;
    }
    .container { max-width: 980px; margin: 0 auto; padding: 3rem 1.25rem; }
    h1 { font-size: clamp(1.8rem, 3.6vw, 2.6rem); margin-bottom: 0.75rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem; margin-top: 2rem; }
    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 1.5rem;
      color: var(--text);
      text-decoration: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .card:hover { border-color: var(--mint); }
    .btn {
      display: inline-block;
      padding: 0.65rem 1.2rem;
      border-radius: 999px;
      background: linear-gradient(135deg, #58fca5, #38bdf8);
      color: #041019;
      font-weight: 700;
      text-decoration: none;
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <p><a href="https://puresite.at/" style="color:var(--mint); text-decoration:none;">← Zurück zu PureSite.at (Startseite &amp; Festpreis-Kalkulator)</a></p>
    <h1>Ratgeber &amp; Wissen: Website kaufen &amp; Webdesign in Graz</h1>
    <p style="color:var(--muted); font-size:1.08rem;">Ehrliche Entscheidungshilfen für steirische KMU, Handwerksbetriebe und Dienstleister zu Preisen, Technik und Agenturauswahl 2026.</p>
    <div class="grid">
      ${ARTICLES.map(
        a => `
      <a href="${a.url}" class="card">
        <div>
          <small style="color:var(--mint); font-weight:700;">${escapeHtml(a.category)} · ${escapeHtml(a.readTime)}</small>
          <h2 style="font-size:1.22rem; margin:0.5rem 0 0.75rem;">${escapeHtml(a.title)}</h2>
          <p style="color:var(--muted); font-size:0.92rem;">${escapeHtml(a.excerpt)}</p>
        </div>
        <span style="color:var(--mint); font-weight:700; font-size:0.9rem; margin-top:1rem;">Kompletten Artikel lesen →</span>
      </a>`
      ).join('\n')}
    </div>
    <div style="margin-top:3rem; text-align:center;">
      <a href="https://puresite.at/#preise" class="btn">Direkt zum Online-Festpreis-Kalkulator (ab 1.000 €) ↗</a>
    </div>
  </div>
</body>
</html>`;
}

const rootDir = path.resolve(process.cwd(), 'public', 'ratgeber');
fs.mkdirSync(rootDir, { recursive: true });
fs.writeFileSync(path.join(rootDir, 'index.html'), renderHubHtml(), 'utf8');

for (const art of ARTICLES) {
  const dir = path.join(rootDir, art.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderArticleHtml(art), 'utf8');
}

console.log('Generated static SEO pages in public/ratgeber/');
