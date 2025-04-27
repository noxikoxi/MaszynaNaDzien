# 🧑‍🌾 System Rezerwacji Maszyn Rolniczych

Aplikacja umożliwiająca rolnikom rezerwowanie maszyn rolniczych (np. traktorów, pługów, kombajnów) w prosty i przejrzysty sposób. Została stworzona z myślą o usprawnieniu zarządzania dostępnością maszyn w gospodarstwach lub lokalnych punktach wynajmu.

## 🧰 Technologie

- **Backend**: Node.js + Express
- **ORM**: Sequelize
- **Baza danych**: SQLite

## ⚙️ Uruchomienie projektu

1. **Zainstaluj zależności**
   ```bash
   npm install

2. **Uruchom serwer**
   ```bash
   npm start

## ⚙️ Uruchomienie projektu docker

1. **Wykonaj plik start.sh**
	```bash
	bash start.sh

### Specyfikacja projektu

#### 1. Wprowadzenie
- celem projektu jest stworzenie aplikacji internetowej umożliwiającej wypożyczanie sprzętu rolniczego,
- sprzęt można zarezerwować cały dzień z nie większym niż 3 miesięcznym wyprzedzeniem,
- grupa docelową są lokalni rolnicy,
- aplikacja ma tworzyć harmonogram na zasadzie "kto pierwszy, ten lepszy".

#### 2. Funkcjonalność serwisu
- wyświetlanie listy wszystkich maszyn rolniczych,
- wyświetlanie listy rezerwacji maszyn rolniczych,
- sortowanie wyświetlanej listy maszyn i rezerwacji,
- tworzenie/anulowanie rezerwacji,
- logowanie i wylogowywanie użytkowników,
- podział na zwykłych użytkowników i administratorów,
- tworzenie/modyfikacja/usuwanie kont użytkowników,
- tworzenie/modyfikacja/usuwanie maszyn przez administratora,
- sortowanie maszyn, rezerwacji i użytkowników
	- Sortowanie maszyn możliwe po:
		- nazwie (alfabetycznie)
		- id (domyślne)
		- typie (według id typu)
	- Sortowanie użytkowników możliwe po:
		- id (domyślne)
		- email (alfabetycznie)
		- nazwisku (alfabetycznie)
		- dacie utworzenia konta użytkownika
	- Sortowanie rezerwacji możliwe po:
		- dacie rozpoczęcia (domyślne)
		- typie maszyny
		- nazwie maszyny
		- email osoby rezerwującej

#### 3. Uprawnienia i funkcjonalności z nimi związane
- funkcjonalności dostępne z poziomu **gościa** (niezalogowanego użytkownika):
	- wyświetlanie listy wszystkich maszyn rolniczych,
	- wyświetlanie listy rezerwacji maszyn rolniczych,
	- utworzenie konta użytkownika.
- funkcjonalności dostępne z poziomu **zalogowanego użytkownika**:
	- wyświetlanie listy wszystkich maszyn rolniczych,
	- wyświetlanie listy wszystkich rezerwacji maszyn rolniczych,
	- wyświetlanie listy swoich rezerwacji,
	- tworzenie/anulowanie rezerwacji,
	- wylogowanie się z aplikacji,
	- modyfikacja swojego konta.
- funkcjonalności dostępne z poziomu **administratora**:
	- tworzenie i usuwanie kont użytkowników,
	- wyświetlanie wszystkich kont użytkowników,
	- wyświetlenie listy wszystkich maszyn rolniczych,
	- wyświetlanie listy rezerwacji maszyn rolniczych,
	- dodawanie nowego sprzętu do bazy danych,
	- usuwanie sprzętu z bazy danych,

#### 4. Architektura i technologie
- warstwowa budowa (podział na część prezentacyjną, logiki biznesowej, danych):
	- zastosowanie wzorca **MVC** (Model, View, Controller).
- aplikacja oparta na **Node.js** i **Express.js**:
	- server side rendering.
- relacyjna baza danych w **sqlite**,
- zastosowanie **ORM Sequelize** do przetwarzania zapytań do bazy danych,
- do tworzenia widoków podstron wykorzystany jest język **PUG**,
- hasła użytkowników kodowanie są za pomocą funkcji haszującej **bcrypt**.

#### 5. Wymagane endpointy do prawidłowego funkcjonowania aplikacji
- pobieranie użytkowników z bazy danych:
	- *\[GET\] /admin/users:{opcja_sortowania}*
- rejestracja:
	- *\[GET / POST\] /users/register*
- logowanie:
	- *\[GET / POST\] /users/login*
- wylogowanie:
	- *\[GET\] /users/logout*
- usuwanie konta użytkownika:
	- *\[GET\] /admin/users/delete/{user_id}*
- tworzenie konta użytkownika:
	- *\[GET / POST\] /admin/users/create*
- modyfikacja profilu użytkownika:
	- *\[GET / POST\] /users/{user_id}*
- wyświetlenie danych użytkownika:
	- *\[GET\] /users/{user_id}*
- pobieranie rezerwacji z bazy danych:
	- *\[GET\] /reservations*
- pobieranie rezerwacji użytkownika z bazy danych:
	- *\[GET\] /reservations/user*
- tworzenie rezerwacji:
	- *\[GET / POST\] /reservations/{machine_id}*
- pobieranie informacji o maszynie i jej rezerwacjach
	- *\[GET\] /reservations/{machine_id}*
- anulowanie rezerwacji:
	- *\[GET\] /reservations/delete/{reservation_id}*
- pobieranie informacji o sprzęcie z bazy danych:
	- *\[GET\] /machines:{opcja_sortowania}}*
- dodanie nowego sprzętu do bazy danych:
	- *\[POST\] /admin/machines/create*
- aktualizacja danych sprzętu:
	- *\[POST\] /admin/machines/edit/{machine_id}*
- usunięcie sprzętu z bazy danych:
	- *\[GET\] /admin/machines/delete/{machine_id}*
- dodanie nowego typu sprzętu do bazy danych:
	- *\[POST\] /admin/machines/type/create*
- usunięcie typu sprzętu do bazy danych:
	- *\[GET\] /admin/machines/type/delete/{type_id}*
- strona główna:
	-  *\[GET\] /*

#### 7. Baza Danych
Tabele wykorzystane w bazie danych.

**Users**
- id -> INTEGER, NOT NULL, PRIMARY KEY, AUTOINCREMET
- given_name -> TEXT, NOT NULL
- surname -> TEXT, NOT NULL
- password -> TEXT, NOT NULL
- email -> TEXT, NOT NULL
- address -> TEXT
	- Adres zamieszkania użytkownika
	- Np. ul. Krakowkska 156, Wadowice
	- opcjonalne
- phone -> TEXT
	- Numer telefonu użytkownika
	- Np. 515 052 556
	- opcjonalne
- isAdmin -> INTEGER, NOT NULL
	- Wartość 1 jeżeli admin lub 0 jeżeli użytkownik
- createdAt -> TIMESTAMP
	- Data i czas utworzenia konta

**Machines**
- id -> INTEGER, NOT NULL, PRIMARY KEY, AUTOINCREMET
- type_id -> INTEGER, NOT NULL
- name -> TEXT, NOT NULL
	- Nazwa maszyny (marka, model)
	- Np. Ursus C330M
- description -> TEXT
	- Szczegółowe informacje o maszynie, jej wyglądzie, specyfikacji lub przeznaczeniu
	- Np. 
		- Czerwony z wgniecionym tylnym prawym błotnikiem.
		- Nadaje się do pracy przy rowach.
		- Szerokość robocza 2m.
	- opcjonalne
	
**MachineType**
- id -> INTEGER, NOT NULL, PRIMARY KEY, AUTOINCREMET
- type -> TEXT, NOT NULL
	- np. ciągnik, brony, siewnik

**Reservations**
- id -> INTEGER, NOT NULL, PRIMARY KEY, AUTOINCREMET
- user_id -> INTEGER, NOT NULL
- machine_id -> INTEGER, NOT NULL
- date_from -> TEXT, NOT NULL
	- Data rozpoczęcia rezerwacji w formacie RRRR-MM-DD
- date_to -> TEXT, NOT NULL
	- Data zakończenia rezerwacji w formacie RRRR-MM-DD
- createdAt -> TIMESTAMP
	- Data i czas utworzenia rezerwacji
