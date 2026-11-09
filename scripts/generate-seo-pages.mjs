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
        heading: 'Warum „Website kaufen“ zum Festpreis das klassische Agenturmodell ablöst',
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
        heading: 'Preisvergleich 2026: Baukasten vs. WordPress-Agentur vs. PureSite Festpreis',
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
        heading: 'Die 5-Punkte-Checkliste: Worauf du beim Website-Kauf in Graz achten musst',
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
        heading: 'So läuft der Kauf deiner neuen Website bei PureSite in Graz ab',
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
        heading: 'Das Problem mit klassischen Website-Agenturen in Graz',
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
        heading: 'Was macht PureSite als Grazer Software Studio anders?',
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
        heading: 'Direktvergleich: Klassische Webagentur Graz vs. PureSite Software Studio',
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
        heading: 'Für welche Unternehmen in Graz & der Steiermark eignet sich PureSite?',
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
        heading: 'Warum die meisten Webdesigner ihre Preise verstecken',
        paragraphs: [
          'Wenn du auf den Websites klassischer Agenturen in Graz oder Wien nach einer konkreten Preisliste suchst, findest du fast immer nur ein Kontaktformular mit dem Hinweis „Individuelles Angebot auf Anfrage“. Dahinter steckt selten technische Notwendigkeit, sondern meist Preispsychologie: Der Preis wird nach dem geschätzten Budget des Kunden festgelegt.',
          'Bei PureSite glauben wir an radikale Transparenz. Deshalb ist unser kompletter Modul-Katalog mit allen Einzelpreisen öffentlich auf unserer Website einsehbar.'
        ]
      },
      {
        heading: 'Die 3 typischen Preisklassen beim Homepage-Erstellen-Lassen in Österreich (2026)',
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
        heading: 'Einmalige Kosten vs. laufende Kosten (Hosting & Wartung)',
        paragraphs: [
          'Ein häufig unterschätzter Kostenblock beim „Homepage erstellen lassen“ sind die Folgekosten nach dem Launch. Bei klassischen WordPress-Seiten summieren sich Hosting, Premium-Plugins (WP Rocket, Elementor Pro, Security-Plugins) und Agentur-Wartungsverträge schnell auf 1.200 € bis 2.500 € pro Jahr.',
          'Da PureSite-Websites statisch kompiliert und frei von anfälligen Datenbank-Plugins sind, gibt es keinen technischen Wartungszwang. Du kannst deine Website auf jedem eigenen Server betreiben (0 € Bindung an uns) oder unser optionales Dedicated-EU-Hosting-Paket (ab 39 €/Monat) wählen, in dem bereits bis zu 3 Stunden persönliche Text- und Bildänderungen auf Zuruf pro Monat enthalten sind!'
        ]
      },
      {
        heading: '50/50-Zahlungsziel & 30 Tage Festpreisgarantie',
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
        heading: 'Die stille Umsatzbremse: Warum alte WordPress-Seiten Kunden vergraulen',
        paragraphs: [
          'Stell dir vor, ein potenzieller Kunde in Graz sucht auf seinem Smartphone nach deiner Dienstleistung, klickt auf deine Website — und sieht drei Sekunden lang einen weißen Bildschirm, gefolgt von einem riesigen Cookie-Banner, der das halbe Display verdeckt. Laut Studien von Google klicken mehr als die Hälfte dieser Besucher sofort auf „Zurück“ und rufen stattdessen deinen Mitbewerber an.',
          'Der Grund liegt fast immer in der veralteten Architektur: Klassische WordPress-Websites mit Page-Buildern wie Elementor, Divi oder WPBakery müssen bei jedem einzelnen Seitenaufruf dutzende Datenbankabfragen, externe Skripte und riesige CSS-Dateien laden.'
        ]
      },
      {
        heading: 'Warum moderner Handcode (React & TypeScript) die beste WordPress-Alternative ist',
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
        heading: 'Sicherer Website Relaunch ohne Verlust bestehender Google-Rankings',
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

const SHARED_STYLES = `
  :root {
    --font-heading: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-sans: 'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* Dark Mode: Deep Obsidian-Sage & Luminous Mint Liquid Glass */
    --bg-canvas: #0b1113;
    --bg-panel: rgba(18, 28, 32, 0.72);
    --bg-card: rgba(22, 35, 40, 0.64);
    --bg-card-solid: #111c20;
    --bg-tertiary: rgba(255, 255, 255, 0.04);

    --pure-mint: #58fca5;
    --wit-accent: #58fca5;
    --wit-accent-ink: #06130e;
    --wit-soft-tint: rgba(88, 252, 165, 0.095);
    --wit-soft-border: rgba(88, 252, 165, 0.28);

    --text-pure: #eef4f1;
    --text-secondary: #b5c6c0;
    --text-muted: #849993;

    --border-subtle: rgba(255, 255, 255, 0.10);
    --border-medium: rgba(255, 255, 255, 0.17);

    --header-bg:
      radial-gradient(120% 180% at 14% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 56%),
      radial-gradient(95% 160% at 88% 100%, rgba(88, 252, 165, 0.065) 0%, transparent 62%),
      linear-gradient(145deg, #152328 0%, #0e171b 58%, #101e1e 100%);
    --card-surface:
      linear-gradient(145deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.018) 58%, rgba(88, 252, 165, 0.025) 100%),
      rgba(15, 24, 28, 0.72);
    --specular-rim:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.18),
      inset 1px 0 0 0 rgba(255, 255, 255, 0.06);
    --card-shadow: 0 22px 50px -16px rgba(0, 0, 0, 0.52), 0 4px 16px rgba(0, 0, 0, 0.24);
    --grid-line: rgba(147, 210, 191, 0.055);
  }

  [data-theme="light"] {
    --bg-canvas: #f5f7f4;
    --bg-panel: rgba(255, 255, 255, 0.85);
    --bg-card: rgba(255, 255, 255, 0.82);
    --bg-card-solid: #ffffff;
    --bg-tertiary: rgba(23, 107, 97, 0.055);

    --pure-mint: #146c60;
    --wit-accent: #176b61;
    --wit-accent-ink: #ffffff;
    --wit-soft-tint: rgba(23, 107, 97, 0.085);
    --wit-soft-border: rgba(23, 107, 97, 0.25);

    --text-pure: #182628;
    --text-secondary: #435458;
    --text-muted: #66777b;

    --border-subtle: rgba(24, 48, 45, 0.095);
    --border-medium: rgba(24, 48, 45, 0.16);

    --header-bg:
      radial-gradient(120% 180% at 14% 0%, rgba(255, 255, 255, 0.98) 0%, transparent 58%),
      radial-gradient(95% 160% at 88% 100%, rgba(23, 107, 97, 0.055) 0%, transparent 62%),
      linear-gradient(145deg, #fcfffe 0%, #f4f9f6 100%);
    --card-surface:
      linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.78) 60%, rgba(233, 245, 239, 0.82) 100%);
    --specular-rim:
      inset 0 1.5px 0 0 rgba(255, 255, 255, 0.95),
      inset 0 -1px 0 0 rgba(23, 107, 97, 0.06);
    --card-shadow: 0 20px 44px -16px rgba(18, 44, 39, 0.11), 0 4px 14px rgba(18, 44, 39, 0.05);
    --grid-line: rgba(23, 107, 97, 0.055);
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: var(--font-sans);
    background-color: var(--bg-canvas);
    color: var(--text-pure);
    line-height: 1.68;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* Ambient Liquid Glass Backdrop & Architectural Grid */
  .ambient-backdrop {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(circle at 16% 12%, var(--wit-soft-tint), transparent 42%),
      radial-gradient(circle at 84% 18%, rgba(94, 234, 212, 0.07), transparent 46%),
      radial-gradient(circle at 50% 85%, var(--wit-soft-tint), transparent 50%);
  }
  .ambient-grid {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image:
      linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 85% 70% at 50% 25%, #000 35%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 85% 70% at 50% 25%, #000 35%, transparent 100%);
  }

  .page-shell {
    position: relative;
    z-index: 1;
  }

  /* Floating Pill Header (1:1 PureSite Main Site) */
  .wit-glass-header {
    position: sticky;
    top: 12px;
    z-index: 1000;
    width: min(1240px, calc(100% - 28px));
    margin: 12px auto 0;
    border-radius: 9999px;
    background: var(--header-bg);
    backdrop-filter: blur(28px) saturate(195%);
    -webkit-backdrop-filter: blur(28px) saturate(195%);
    border: 1px solid var(--border-medium);
    box-shadow: var(--specular-rim), var(--card-shadow);
  }
  .wit-header-inner {
    height: 68px;
    padding-inline: clamp(14px, 2vw, 26px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: nowrap;
  }
  .wit-brand {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    color: var(--text-pure);
    text-decoration: none !important;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .wit-brand img {
    width: 36px;
    height: 36px;
    border-radius: 9px;
    object-fit: contain;
  }
  .wit-brand-text {
    font-family: var(--font-heading);
    font-size: 1.28rem;
    font-weight: 800;
    letter-spacing: -0.045em;
    line-height: 1;
    color: var(--text-pure);
  }
  .wit-brand-light {
    font-weight: 400;
    color: var(--wit-accent);
  }
  .wit-brand-subtitle {
    display: block;
    margin-top: 3px;
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.19em;
    color: var(--text-muted);
  }
  .wit-desktop-nav {
    display: flex;
    align-items: center;
    gap: clamp(4px, 0.9vw, 14px);
    margin-left: auto;
    margin-right: 6px;
    white-space: nowrap;
    flex-wrap: nowrap;
  }
  .wit-nav-link {
    padding: 7px 11px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-decoration: none !important;
    transition: all 0.18s ease;
    white-space: nowrap;
  }
  .wit-nav-link:hover,
  .wit-nav-link.is-active {
    color: var(--wit-accent);
    background: var(--wit-soft-tint);
  }
  .wit-header-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .wit-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 16px;
    border-radius: 999px;
    background: var(--wit-accent);
    color: var(--wit-accent-ink) !important;
    font-weight: 700;
    font-size: 0.85rem;
    text-decoration: none !important;
    box-shadow: 0 8px 22px -6px rgba(88, 252, 165, 0.35);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    white-space: nowrap;
  }
  [data-theme="light"] .wit-cta-btn {
    box-shadow: 0 8px 20px -6px rgba(23, 107, 97, 0.32);
  }
  .wit-cta-btn:hover {
    transform: translateY(-1px);
  }

  /* Main Container & Editorial Layout */
  .wit-wrap {
    width: min(1200px, calc(100% - 32px));
    margin: 0 auto;
  }

  /* Article Hero Card */
  .article-hero {
    margin-top: 2.25rem;
    padding: clamp(1.75rem, 3.5vw, 3rem);
    border-radius: 28px;
    background: var(--card-surface);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--border-medium);
    box-shadow: var(--specular-rim), var(--card-shadow);
    position: relative;
    overflow: hidden;
  }
  .breadcrumb-bar {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    font-size: 0.82rem;
    color: var(--text-muted);
    margin-bottom: 1.15rem;
    padding: 5px 12px;
    border-radius: 999px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
  }
  .breadcrumb-bar a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 600;
  }
  .breadcrumb-bar a:hover { color: var(--wit-accent); }

  .meta-pills {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .badge-accent {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 13px;
    border-radius: 999px;
    background: var(--wit-soft-tint);
    border: 1px solid var(--wit-soft-border);
    color: var(--wit-accent);
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }
  .badge-muted {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 999px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    font-size: 0.78rem;
    font-weight: 600;
  }

  .article-hero h1 {
    font-family: var(--font-heading);
    font-size: clamp(1.85rem, 3.6vw, 2.85rem);
    font-weight: 800;
    line-height: 1.16;
    letter-spacing: -0.032em;
    color: var(--text-pure);
    margin: 0 0 1.15rem 0;
    max-width: 26ch;
  }
  .article-lead {
    font-size: clamp(1.02rem, 1.35vw, 1.16rem);
    line-height: 1.65;
    color: var(--text-secondary);
    margin: 0 0 1.75rem 0;
    max-width: 72ch;
  }

  /* 4-Metric Trust Dock inside Hero */
  .metrics-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-subtle);
  }
  .metric-box {
    padding: 12px 14px;
    border-radius: 16px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
  }
  .metric-box strong {
    display: block;
    font-family: var(--font-heading);
    font-size: 1.12rem;
    font-weight: 800;
    color: var(--wit-accent);
    line-height: 1.2;
  }
  .metric-box span {
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  /* 2-Column Editorial Grid */
  .editorial-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 2rem;
    margin-top: 2rem;
    align-items: start;
  }

  /* Takeaways Bento Box */
  .takeaways-card {
    padding: 1.65rem 1.85rem;
    border-radius: 24px;
    background: var(--wit-soft-tint);
    border: 1px solid var(--wit-soft-border);
    box-shadow: var(--specular-rim);
    margin-bottom: 1.75rem;
  }
  .takeaways-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-heading);
    font-size: 1.02rem;
    font-weight: 800;
    color: var(--wit-accent);
    margin-bottom: 1rem;
  }
  .check-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.7rem;
  }
  .check-list li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.95rem;
    color: var(--text-pure);
    line-height: 1.55;
  }
  .check-icon {
    width: 20px;
    height: 20px;
    border-radius: 999px;
    background: var(--wit-soft-tint);
    border: 1px solid var(--wit-soft-border);
    color: var(--wit-accent);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* Chapter Cards */
  .chapter-card {
    padding: clamp(1.5rem, 2.8vw, 2.2rem);
    border-radius: 24px;
    background: var(--card-surface);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border: 1px solid var(--border-subtle);
    box-shadow: var(--specular-rim), var(--card-shadow);
    margin-bottom: 1.5rem;
    scroll-margin-top: 96px;
  }
  .chapter-num {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--wit-accent);
    background: var(--wit-soft-tint);
    border: 1px solid var(--wit-soft-border);
    padding: 3px 10px;
    border-radius: 999px;
    margin-bottom: 0.75rem;
  }
  .chapter-card h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.25rem, 2vw, 1.52rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.3;
    color: var(--text-pure);
    margin: 0 0 0.9rem 0;
  }
  .chapter-card p {
    font-size: 0.98rem;
    line-height: 1.72;
    color: var(--text-secondary);
    margin: 0 0 1rem 0;
  }
  .chapter-card p:last-child { margin-bottom: 0; }

  .highlight-callout {
    margin-top: 1.25rem;
    padding: 1.2rem 1.35rem;
    border-radius: 16px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
    border-left: 4px solid var(--wit-accent);
  }
  .highlight-callout strong {
    display: block;
    font-size: 0.95rem;
    color: var(--text-pure);
    margin-bottom: 0.3rem;
  }
  .highlight-callout span {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* Interactive FAQ Accordion */
  .faq-section {
    margin-top: 2.25rem;
    scroll-margin-top: 96px;
  }
  .faq-section-title {
    font-family: var(--font-heading);
    font-size: 1.45rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
  }
  details.faq-item {
    border-radius: 18px;
    background: var(--card-surface);
    border: 1px solid var(--border-subtle);
    box-shadow: var(--specular-rim);
    margin-bottom: 0.85rem;
    overflow: hidden;
    transition: border-color 0.2s ease;
  }
  details.faq-item[open] {
    border-color: var(--wit-soft-border);
  }
  details.faq-item summary {
    list-style: none;
    cursor: pointer;
    padding: 1.15rem 1.35rem;
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-pure);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  details.faq-item summary::-webkit-details-marker { display: none; }
  .faq-toggle-pill {
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-subtle);
    color: var(--wit-accent);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  details.faq-item[open] .faq-toggle-pill {
    transform: rotate(45deg);
    background: var(--wit-soft-tint);
  }
  .faq-answer {
    padding: 0 1.35rem 1.25rem 1.35rem;
    color: var(--text-secondary);
    font-size: 0.94rem;
    line-height: 1.65;
    border-top: 1px solid var(--border-subtle);
    padding-top: 0.95rem;
  }

  /* Sticky Right Sidebar */
  .sticky-sidebar {
    position: sticky;
    top: 96px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .sidebar-card {
    padding: 1.45rem;
    border-radius: 22px;
    background: var(--card-surface);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border: 1px solid var(--border-medium);
    box-shadow: var(--specular-rim), var(--card-shadow);
  }
  .sidebar-overline {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--wit-accent);
    margin: 0 0 0.75rem 0;
  }
  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }
  .toc-link {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 7px 10px;
    border-radius: 10px;
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-decoration: none !important;
    transition: all 0.18s ease;
    line-height: 1.38;
  }
  .toc-link:hover {
    background: var(--wit-soft-tint);
    color: var(--wit-accent);
  }
  .toc-num {
    font-family: var(--font-mono);
    font-size: 0.74rem;
    color: var(--wit-accent);
    margin-top: 1px;
  }

  .price-highlight-box {
    margin: 0.85rem 0 1rem;
    padding: 0.95rem 1.1rem;
    border-radius: 14px;
    background: var(--wit-soft-tint);
    border: 1px solid var(--wit-soft-border);
  }
  .price-highlight-box strong {
    display: block;
    font-family: var(--font-heading);
    font-size: 1.55rem;
    font-weight: 800;
    color: var(--text-pure);
    line-height: 1.15;
  }
  .price-highlight-box span {
    font-size: 0.78rem;
    color: var(--text-secondary);
  }

  /* Closing Conversion Banner */
  .conversion-banner {
    margin-top: 2.25rem;
    padding: clamp(1.75rem, 3.5vw, 2.6rem);
    border-radius: 26px;
    background:
      radial-gradient(120% 180% at 10% 0%, var(--wit-soft-tint) 0%, transparent 60%),
      var(--card-surface);
    border: 1px solid var(--wit-soft-border);
    box-shadow: var(--specular-rim), var(--card-shadow);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .conversion-banner h2 {
    font-family: var(--font-heading);
    font-size: clamp(1.35rem, 2.4vw, 1.85rem);
    font-weight: 800;
    margin: 0;
  }
  .conversion-banner p {
    color: var(--text-secondary);
    margin: 0;
    font-size: 1rem;
    max-width: 64ch;
  }

  /* Related Articles Grid */
  .related-section {
    margin-top: 3rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--border-subtle);
  }
  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
    margin-top: 1.25rem;
  }
  .related-card {
    padding: 1.45rem;
    border-radius: 22px;
    background: var(--card-surface);
    border: 1px solid var(--border-subtle);
    box-shadow: var(--specular-rim), var(--card-shadow);
    color: var(--text-pure);
    text-decoration: none !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .related-card:hover {
    transform: translateY(-3px);
    border-color: var(--wit-soft-border);
  }

  /* PureSite 3-Column Footer */
  .wit-site-footer {
    margin-top: 4.5rem;
    padding: 3.5rem 0 2.5rem;
    border-top: 1px solid var(--border-subtle);
    background: var(--bg-panel);
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 2.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid var(--border-subtle);
  }
  .footer-col h4 {
    font-family: var(--font-mono);
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--wit-accent);
    margin: 0 0 1rem 0;
  }
  .footer-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }
  .footer-col a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.18s ease;
  }
  .footer-col a:hover { color: var(--wit-accent); }
  .footer-bottom {
    padding-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    font-size: 0.82rem;
    color: var(--text-muted);
  }

  @media (max-width: 1024px) {
    .wit-desktop-nav { display: none; }
    .editorial-grid { grid-template-columns: 1fr; }
    .sticky-sidebar { position: static; }
    .metrics-strip { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr; gap: 1.75rem; }
  }
  @media (max-width: 560px) {
    .metrics-strip { grid-template-columns: 1fr; }
  }
`;

const THEME_INIT_SCRIPT = `
  (function() {
    try {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('puresite-theme', 'light');
    } catch (e) {}
  })();
`;

const THEME_TOGGLE_SCRIPT = `
  (function() {
    var logo = document.getElementById('brand-logo-img');
    var footerLogo = document.getElementById('footer-logo-img');
    if (logo) logo.src = '/assets/puresite-logo-dark-stroke.png';
    if (footerLogo) footerLogo.src = '/assets/puresite-logo-dark-stroke.png';
  })();
`;

function renderHeaderHtml() {
  return `
  <header class="wit-glass-header">
    <div class="wit-header-inner">
      <a href="https://puresite.at/" class="wit-brand" aria-label="PureSite — Startseite">
        <img id="brand-logo-img" src="/assets/puresite-logo-dark-stroke.png" alt="PureSite Logo" width="36" height="36" />
        <span class="wit-brand-text">
          pure<span class="wit-brand-light">site</span>
          <small class="wit-brand-subtitle">SOFTWARE STUDIO</small>
        </span>
      </a>

      <nav class="wit-desktop-nav" aria-label="Hauptnavigation">
        <a href="https://puresite.at/#demos" class="wit-nav-link">Leistungen &amp; Demos</a>
        <a href="https://puresite.at/#warum-wir" class="wit-nav-link">Praxis &amp; Technik</a>
        <a href="https://puresite.at/#preise" class="wit-nav-link">Festpreis-Rechner</a>
        <a href="https://puresite.at/#prozess" class="wit-nav-link">Zusammenarbeit</a>
        <a href="https://puresite.at/#ueber-uns" class="wit-nav-link">Über uns</a>
        <a href="/ratgeber/" class="wit-nav-link is-active">Ratgeber</a>
      </nav>

      <div class="wit-header-controls">
        <a href="https://puresite.at/#preise" class="wit-cta-btn">
          <span>Kalkulator</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg>
        </a>
      </div>
    </div>
  </header>`;
}

function renderFooterHtml() {
  return `
  <footer class="wit-site-footer">
    <div class="wit-wrap">
      <div class="footer-grid">
        <div class="footer-col">
          <a href="https://puresite.at/" class="wit-brand" style="margin-bottom:0.85rem;">
            <img id="footer-logo-img" src="/assets/puresite-logo-dark-stroke.png" alt="PureSite Logo" width="32" height="32" />
            <span class="wit-brand-text">pure<span class="wit-brand-light">site</span></span>
          </a>
          <p style="color:var(--text-secondary); font-size:0.9rem; margin:0.6rem 0 0; max-width:36ch;">
            Webdesign &amp; Softwareentwicklung für Graz, die Steiermark &amp; ganz Österreich. Handgeschriebene Websites zum garantierten Festpreis.
          </p>
        </div>

        <div class="footer-col">
          <h4>Ratgeber &amp; Themen</h4>
          <ul>
            ${ARTICLES.map(a => `<li><a href="${a.url}">${escapeHtml(a.shortTitle)}</a></li>`).join('\n            ')}
          </ul>
        </div>

        <div class="footer-col">
          <h4>Direktkontakt Graz</h4>
          <ul>
            <li><a href="mailto:maximilian.schlacher@outlook.com">maximilian.schlacher@outlook.com</a></li>
            <li><a href="tel:+436766500468">+43 676 6500468</a></li>
            <li><a href="https://puresite.at/#preise">Online-Festpreis-Kalkulator (ab 1.000 €) ↗</a></li>
            <li style="color:var(--text-muted); font-size:0.84rem; margin-top:0.35rem;">
              Maximilian Schlacher &amp; Loreno Zanaboni<br/>Am Leopoldsgrund 19, 8055 Graz
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 PureSite Software Studio · Webdesign Graz &amp; Steiermark · Am Leopoldsgrund 19, 8055 Graz</span>
        <a href="https://puresite.at/" style="color:var(--wit-accent); text-decoration:none; font-weight:700;">← Zurück zur Hauptseite puresite.at</a>
      </div>
    </div>
  </footer>`;
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
          { '@type': 'Person', name: 'Maximilian Schlacher' },
          { '@type': 'Person', name: 'Loreno Zanaboni' }
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
<html lang="de-AT" data-theme="light">
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Manrope:wght@600;700;800&display=swap" />
  <script>${THEME_INIT_SCRIPT}</script>
  <script type="application/ld+json">${schemaJson}</script>
  <style>${SHARED_STYLES}</style>
</head>
<body>
  <div class="ambient-backdrop" aria-hidden="true"></div>
  <div class="ambient-grid" aria-hidden="true"></div>

  <div class="page-shell">
    ${renderHeaderHtml()}

    <main class="wit-wrap">
      <!-- Editorial Hero Card -->
      <section class="article-hero">
        <nav class="breadcrumb-bar" aria-label="Breadcrumb">
          <a href="https://puresite.at/">PureSite Graz</a>
          <span>›</span>
          <a href="/ratgeber/">Ratgeber</a>
          <span>›</span>
          <span style="color:var(--text-pure);">${escapeHtml(article.shortTitle)}</span>
        </nav>

        <div class="meta-pills">
          <span class="badge-accent">${escapeHtml(article.category)}</span>
          <span class="badge-muted">⏱ ${escapeHtml(article.readTime)}</span>
          <span class="badge-muted">📍 Graz &amp; Steiermark (Stand: Nov. 2026)</span>
        </div>

        <h1>${escapeHtml(article.title)}</h1>
        <p class="article-lead">${escapeHtml(article.excerpt)}</p>

        <div class="metrics-strip">
          <div class="metric-box">
            <strong>ab 1.000 €</strong>
            <span>Garantierter Festpreis</span>
          </div>
          <div class="metric-box">
            <strong>&lt; 0,4 Sek.</strong>
            <span>Echte Ladezeit (Handcode)</span>
          </div>
          <div class="metric-box">
            <strong>100 / 100</strong>
            <span>Google PageSpeed Score</span>
          </div>
          <div class="metric-box">
            <strong>50% / 50%</strong>
            <span>Sichere Zahlung nach Abnahme</span>
          </div>
        </div>
      </section>

      <!-- 2-Column Content + Sticky Sidebar -->
      <div class="editorial-grid">
        <article>
          <!-- Key Takeaways Bento Card -->
          <div class="takeaways-card">
            <div class="takeaways-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              <span>Das Wichtigste auf einen Blick</span>
            </div>
            <ul class="check-list">
              ${article.keyTakeaways
                .map(
                  t => `
              <li>
                <span class="check-icon">✓</span>
                <span>${escapeHtml(t)}</span>
              </li>`
                )
                .join('')}
            </ul>
          </div>

          <!-- Numbered Chapters -->
          ${article.sections
            .map(
              (sec, idx) => `
          <section id="kapitel-${idx + 1}" class="chapter-card">
            <span class="chapter-num">KAPITEL 0${idx + 1}</span>
            <h2>${escapeHtml(sec.heading)}</h2>
            ${sec.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('\n            ')}
            ${
              sec.bullets
                ? `<ul class="check-list" style="margin-top:1.1rem;">\n              ${sec.bullets
                    .map(
                      b => `<li><span class="check-icon">✓</span><span>${escapeHtml(b)}</span></li>`
                    )
                    .join('\n              ')}\n            </ul>`
                : ''
            }
            ${
              sec.highlightBox
                ? `<div class="highlight-callout"><strong>${escapeHtml(sec.highlightBox.title)}</strong><span>${escapeHtml(sec.highlightBox.text)}</span></div>`
                : ''
            }
          </section>`
            )
            .join('\n')}

          <!-- FAQ Accordion -->
          <section id="faq" class="faq-section">
            <h2 class="faq-section-title">Häufig gestellte Fragen zum Thema</h2>
            ${article.faq
              .map(
                (f, i) => `
            <details class="faq-item" ${i === 0 ? 'open' : ''}>
              <summary>
                <span>${escapeHtml(f.question)}</span>
                <span class="faq-toggle-pill">+</span>
              </summary>
              <div class="faq-answer">${escapeHtml(f.answer)}</div>
            </details>`
              )
              .join('\n')}
          </section>

          <!-- Closing Conversion Banner -->
          <div class="conversion-banner">
            <div>
              <span class="badge-accent" style="margin-bottom:0.65rem;">100 % unverbindlich · 8055 Graz</span>
              <h2>${escapeHtml(article.ctaTitle)}</h2>
            </div>
            <p>${escapeHtml(article.ctaSub)}</p>
            <div style="display:flex; gap:0.85rem; flex-wrap:wrap; align-items:center;">
              <a href="https://puresite.at/#preise" class="wit-cta-btn" style="padding:12px 22px; font-size:0.94rem;">
                <span>Jetzt im Festpreis-Rechner kalkulieren</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg>
              </a>
              <a href="https://puresite.at/#demos" class="wit-nav-link" style="border:1px solid var(--border-medium); padding:11px 18px; color:var(--text-pure);">
                18 interaktive Live-Demos testen →
              </a>
              <a href="tel:+436766500468" class="wit-nav-link" style="border:1px solid var(--border-subtle); padding:11px 18px;">
                📞 +43 676 6500468
              </a>
            </div>
          </div>
        </article>

        <!-- Sticky Right Sidebar -->
        <aside class="sticky-sidebar" aria-label="Inhaltsverzeichnis &amp; Direktkalkulator">
          <div class="sidebar-card">
            <p class="sidebar-overline">Inhaltsverzeichnis</p>
            <ul class="toc-list">
              ${article.sections
                .map(
                  (sec, idx) => `
              <li>
                <a href="#kapitel-${idx + 1}" class="toc-link">
                  <span class="toc-num">0${idx + 1}</span>
                  <span>${escapeHtml(sec.heading)}</span>
                </a>
              </li>`
                )
                .join('')}
              <li>
                <a href="#faq" class="toc-link">
                  <span class="toc-num">FAQ</span>
                  <span>Häufige Fragen &amp; Antworten</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="sidebar-card">
            <p class="sidebar-overline">Sofort-Orientierung</p>
            <h3 style="font-family:var(--font-heading); font-size:1.15rem; margin:0 0 0.4rem;">Website zum Festpreis konfigurieren</h3>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin:0;">
              Stelle dir deine Wunsch-Module in 60 Sekunden zusammen — mit sofortigem PDF-Angebot.
            </p>
            <div class="price-highlight-box">
              <strong>ab 1.000 €</strong>
              <span>Fixpreis · 30 Tage Preisgarantie</span>
            </div>
            <ul class="check-list" style="margin-bottom:1.15rem; gap:0.45rem;">
              <li style="font-size:0.82rem;"><span class="check-icon" style="width:17px;height:17px;font-size:0.7rem;">✓</span><span>Keine versteckten Agentur-Stundensätze</span></li>
              <li style="font-size:0.82rem;"><span class="check-icon" style="width:17px;height:17px;font-size:0.7rem;">✓</span><span>50 % bei Start · 50 % erst bei Livegang</span></li>
              <li style="font-size:0.82rem;"><span class="check-icon" style="width:17px;height:17px;font-size:0.7rem;">✓</span><span>Direkt in Graz (Maximilian &amp; Loreno)</span></li>
            </ul>
            <a href="https://puresite.at/#preise" class="wit-cta-btn" style="width:100%; justify-content:center; padding:11px 16px;">
              <span>Zum Online-Kalkulator</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg>
            </a>
          </div>
        </aside>
      </div>

      <!-- Related Articles -->
      <section class="related-section">
        <span class="badge-accent" style="margin-bottom:0.5rem;">Weiterführende Ratgeber</span>
        <h2 style="font-family:var(--font-heading); font-size:1.6rem; margin:0;">Weitere Praxis-Artikel für Grazer Betriebe</h2>
        <div class="related-grid">
          ${otherArticles
            .map(
              oa => `
          <a href="${oa.url}" class="related-card">
            <div>
              <span class="badge-accent" style="font-size:0.68rem; padding:3px 10px; margin-bottom:0.65rem;">${escapeHtml(oa.category)}</span>
              <h3 style="font-family:var(--font-heading); font-size:1.12rem; margin:0 0 0.5rem; line-height:1.35;">${escapeHtml(oa.title)}</h3>
              <p style="font-size:0.86rem; color:var(--text-secondary); margin:0;">${escapeHtml(oa.excerpt.slice(0, 140))}...</p>
            </div>
            <span style="color:var(--wit-accent); font-weight:700; font-size:0.86rem;">Artikel lesen (${escapeHtml(oa.readTime)}) →</span>
          </a>`
            )
            .join('\n')}
        </div>
      </section>
    </main>

    ${renderFooterHtml()}
  </div>
  <script>${THEME_TOGGLE_SCRIPT}</script>
</body>
</html>`;
}

function renderHubHtml() {
  const canonicalUrl = 'https://puresite.at/ratgeber/';
  return `<!doctype html>
<html lang="de-AT" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Webdesign Ratgeber Graz &amp; Steiermark: Website kaufen, Preise &amp; Agentur-Vergleich | PureSite</title>
  <meta name="description" content="Praxis-Ratgeber für Unternehmen in Graz &amp; Steiermark: Website kaufen zum Festpreis, Website Agentur Graz Vergleich, Homepage Kosten 2026 &amp; Relaunch." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" href="/favicon.ico" sizes="48x48" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Manrope:wght@600;700;800&display=swap" />
  <script>${THEME_INIT_SCRIPT}</script>
  <style>${SHARED_STYLES}</style>
</head>
<body>
  <div class="ambient-backdrop" aria-hidden="true"></div>
  <div class="ambient-grid" aria-hidden="true"></div>

  <div class="page-shell">
    ${renderHeaderHtml()}

    <main class="wit-wrap">
      <section class="article-hero">
        <nav class="breadcrumb-bar" aria-label="Breadcrumb">
          <a href="https://puresite.at/">PureSite Graz</a>
          <span>›</span>
          <span style="color:var(--text-pure);">Ratgeber &amp; Wissen</span>
        </nav>

        <div class="meta-pills">
          <span class="badge-accent">Praxis-Ratgeber 2026</span>
          <span class="badge-muted">📍 Für KMU &amp; Betriebe in Graz &amp; Steiermark</span>
        </div>

        <h1>Website kaufen, Agentur-Vergleich &amp; echte Webdesign-Preise in Graz</h1>
        <p class="article-lead">
          Transparente Entscheidungshilfen ohne Agentur-Blabla: Erfahre, worauf es beim Kauf einer Website in Graz ankommt, was eine professionelle Homepage 2026 wirklich kostet und wie moderner Handcode dein Google-Ranking steigert.
        </p>

        <div class="metrics-strip">
          <div class="metric-box">
            <strong>4 Guides</strong>
            <span>Praxiswissen für KMU</span>
          </div>
          <div class="metric-box">
            <strong>ab 1.000 €</strong>
            <span>Garantierter Festpreis</span>
          </div>
          <div class="metric-box">
            <strong>&lt; 0,4 Sek.</strong>
            <span>Ladezeit ohne WordPress</span>
          </div>
          <div class="metric-box">
            <strong>8055 Graz</strong>
            <span>Persönlich vor Ort</span>
          </div>
        </div>
      </section>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 480px), 1fr)); gap:1.5rem; margin-top:2rem;">
        ${ARTICLES.map(
          (a, i) => `
        <article class="chapter-card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between; gap:1.25rem;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.75rem; flex-wrap:wrap; margin-bottom:0.85rem;">
              <span class="chapter-num" style="margin:0;">GUIDE 0${i + 1} · ${escapeHtml(a.category.toUpperCase())}</span>
              <span style="font-size:0.8rem; color:var(--text-muted);">⏱ ${escapeHtml(a.readTime)}</span>
            </div>
            <h2 style="font-size:1.32rem; margin:0 0 0.75rem;">
              <a href="${a.url}" style="color:inherit; text-decoration:none;">${escapeHtml(a.title)}</a>
            </h2>
            <p style="font-size:0.94rem;">${escapeHtml(a.excerpt)}</p>
            <ul class="check-list" style="margin-top:1rem;">
              ${a.keyTakeaways
                .slice(0, 3)
                .map(t => `<li style="font-size:0.86rem;"><span class="check-icon">✓</span><span>${escapeHtml(t)}</span></li>`)
                .join('')}
            </ul>
          </div>
          <div style="padding-top:1rem; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
            <a href="${a.url}" class="wit-cta-btn">
              <span>Kompletten Artikel lesen</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg>
            </a>
            <span style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(a.keywords[0])}</span>
          </div>
        </article>`
        ).join('\n')}
      </div>

      <div class="conversion-banner">
        <div>
          <span class="badge-accent" style="margin-bottom:0.65rem;">Festpreis-Kalkulator</span>
          <h2>Berechne deine neue Website in 60 Sekunden online</h2>
        </div>
        <p>Stelle dir deine benötigten Module transparent zusammen, sieh sofort deinen verbindlichen Festpreis und lade dir dein Angebot direkt als PDF herunter.</p>
        <div>
          <a href="https://puresite.at/#preise" class="wit-cta-btn" style="padding:12px 22px; font-size:0.94rem;">
            <span>Direkt zum Festpreis-Rechner (ab 1.000 €)</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg>
          </a>
        </div>
      </div>
    </main>

    ${renderFooterHtml()}
  </div>
  <script>${THEME_TOGGLE_SCRIPT}</script>
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

console.log('Successfully generated Liquid-Glass SEO subpages in public/ratgeber/');
