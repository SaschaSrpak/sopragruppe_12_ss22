create table Aktivitaet
(
    Activity_ID        varchar(20)  not null
        primary key,
    Name               varchar(100) null,
    Man_Day_Capacity   float        not null,
    Last_modified_date timestamp    not null
);

create table Ereignis
(
    Event_ID           varchar(20)  not null
        primary key,
    Name               varchar(100) not null,
    Time               timestamp    not null,
    Last_modified_date timestamp    not null
);

create table Person
(
    User_ID            varchar(20)  not null
        primary key,
    Name               varchar(100) not null,
    Nachname           varchar(100) not null,
    EMail              varchar(100) not null,
    Username           varchar(100) not null,
    Last_modified_date timestamp    not null
);

create table Aktivitaet_Zustaendigkeit
(
    Activity_ID varchar(20) not null,
    User_ID     varchar(20) not null,
    constraint Aktivitaet_Zustaendigkeit_Aktivitaet_Activity_ID_fk
        foreign key (Activity_ID) references Aktivitaet (Activity_ID),
    constraint Aktivitaet_Zustaendigkeit_Person_User_ID_fk
        foreign key (User_ID) references Person (User_ID)
);

create table Buchung
(
    Transaction_ID varchar(20) not null
        primary key,
    User_ID        varchar(20) not null,
    Activity_ID    varchar(20) null,
    constraint Buchung_Aktivitaet_Activity_ID_fk
        foreign key (Activity_ID) references Aktivitaet (Activity_ID),
    constraint Buchung_Person_User_ID_fk
        foreign key (User_ID) references Person (User_ID)
);

create table Buchungs_Bezug_Ereignis
(
    Transaction_ID varchar(20) not null,
    Event_ID       varchar(20) null,
    constraint Buchungs_Bezug_Ereignis_Buchung_Transaction_ID_fk
        foreign key (Transaction_ID) references Buchung (Transaction_ID),
    constraint Buchungs_Bezug_Ereignis_Ereignis_Event_ID_fk
        foreign key (Event_ID) references Ereignis (Event_ID)
);

create table Buchungs_Bezug_Zeitintervall
(
    Transaction_ID varchar(20) not null,
    Event_ID       varchar(20) not null,
    constraint Buchungs_Bezug_Zeitintervall_Buchung_Transaction_ID_fk
        foreign key (Transaction_ID) references Buchung (Transaction_ID),
    constraint Buchungs_Bezug_Zeitintervall_Ereignis_Event_ID_fk
        foreign key (Event_ID) references Ereignis (Event_ID)
);

create table Projekt
(
    Project_ID         varchar(20)  not null
        primary key,
    Name               varchar(100) not null,
    Client             varchar(100) not null,
    Description        varchar(500) null,
    Last_modified_date timestamp    not null
);

create table Projekt_Aktivitaeten
(
    Project_ID  varchar(20) not null,
    Activity_ID varchar(20) not null,
    constraint Projekt_Aktivitaeten_Aktivitaet_Activity_ID_fk
        foreign key (Activity_ID) references Aktivitaet (Activity_ID),
    constraint Projekt_Aktivitaeten_Projekt_Project_ID_fk
        foreign key (Project_ID) references Projekt (Project_ID)
);

create table Projekt_Ersteller
(
    Project_ID varchar(20) not null,
    User_ID    varchar(20) not null,
    constraint Projekt_Ersteller_Person_User_ID_fk
        foreign key (User_ID) references Person (User_ID),
    constraint Projekt_Ersteller_Projekt_Project_ID_fk
        foreign key (Project_ID) references Projekt (Project_ID)
);

create table Projekt_Zustaendigkeit
(
    Project_ID varchar(20) not null,
    User_ID    varchar(20) not null,
    constraint Projekt_Zustaendigkeit_Person_User_ID_fk
        foreign key (User_ID) references Person (User_ID),
    constraint Projekt_Zustaendigkeit_Projekt_Project_ID_fk
        foreign key (Project_ID) references Projekt (Project_ID)
);

create table Zeitintervall
(
    Interval_ID        varchar(20)  not null
        primary key,
    Name               varchar(100) not null,
    Duration           float        not null,
    Start_Event_ID     varchar(20)  not null,
    End_Event_ID       varchar(20)  not null,
    Last_modified_date timestamp    not null,
    constraint Zeitintervall_Ereignis_Event_ID_fk
        foreign key (Start_Event_ID) references Ereignis (Event_ID),
    constraint Zeitintervall_Ereignis_Event_ID_fk_2
        foreign key (End_Event_ID) references Ereignis (Event_ID)
);

create table Zeitkonto
(
    Account_ID varchar(20) not null
        primary key,
    Owner_ID   varchar(20) null,
    constraint Zeitkonto_Person_User_ID_fk
        foreign key (Owner_ID) references Person (User_ID)
);


