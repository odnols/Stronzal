var owners = {
    8347283 : "Admiral James T.",
    1723349 : "Adele",
    4184959 : "C418",
    8553569 : "Supertramp",
    2938356 : "Boney M.",
    3945834 : "Tears For Fears",
    2382932 : "Level 42"
}

var albuns = {
    283472 : {
        cover : "https://f4.bcbits.com/img/a3559269778_10.jpg",
        name : "Train Fever Soundtrack",
        likes : 0,
        owner : 8347283
    },
    238425 : {
        cover : "https://upload.wikimedia.org/wikipedia/pt/0/09/Capa_de_Skyfall.jpg",
        name : "Skyfall",
        likes : 0,
        owner : 1723349
    },
    418854 : {
        cover : "https://i.scdn.co/image/ab67616d0000b2734cf0b29eb06a92aa96acae64",
        name : "Minecraft - Volume Beta",
        likes : 0,
        owner : 4184959
    },
    945345 : {
        cover : "https://upload.wikimedia.org/wikipedia/pt/c/cf/Supertramp_-_Breakfast_in_America_%281979%29.jpg",
        name : "Breakfast in America",
        likes : 0,
        owner : 8553569
    },
    485345 : {
        cover : "https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/d9/7d/8d/d97d8df4-d396-92b4-a68d-916718a9d454/dj.vmtarinh.jpg/1200x1200bf-60.jpg",
        name : "Nightflight to Venus",
        likes : 0,
        owner : 2938356
    },
    953452 : {
        cover : "https://i.scdn.co/image/ab67616d0000b2739565c4df27be4aee5edc8009",
        name : "Songs From The Big Chair",
        likes : 0,
        owner : 3945834
    },
    583459 : {
        cover : "https://studiosol-a.akamaihd.net/uploadfile/letras/albuns/8/0/4/6/618611516192171.jpg",
        name : "Rule the World – The Greatest Hits",
        likes : 0,
        owner : 3945834
    },
    348953 : {
        cover : "https://upload.wikimedia.org/wikipedia/en/f/f7/Level_42_-_Running_In_The_Family_album_cover.jpg",
        name : "Running in the Family",
        likes : 0,
        owner : 2382932
    },
    348954 : {
        cover : "https://lastfm.freetls.fastly.net/i/u/500x500/d57f3919c4b24c43cc755075b09a1950.jpg",
        name : "World Machine",
        likes : 0,
        owner : 2382932
    }
}

function dados_albuns(id_album){

    let album = [];

    switch(id_album){
        case 283472:
            album = [
                {id: 101, mp3: "songs/283472/1.mp3", album: "283472", name: "Backbug"},
                {id: 102, mp3: "songs/283472/2.mp3", album: "283472", name: "Chaka Train"},
                {id: 103, mp3: "songs/283472/3.mp3", album: "283472", name: "Dakota"},
                {id: 104, mp3: "songs/283472/4.mp3", album: "283472", name: "Feet Down Below"},
                {id: 105, mp3: "songs/283472/5.mp3", album: "283472", name: "Orient Train"},
                {id: 106, mp3: "songs/283472/6.mp3", album: "283472", name: "New World"},
                {id: 107, mp3: "songs/283472/7.mp3", album: "283472", name: "Swinging Priest"},
                {id: 108, mp3: "songs/283472/8.mp3", album: "283472", name: "Love Train"},
                {id: 109, mp3: "songs/283472/9.mp3", album: "283472", name: "Trailerpark"},
                {id: 110, mp3: "songs/283472/10.mp3", album: "283472", name: "Emma"},
                {id: 111, mp3: "songs/283472/11.mp3", album: "283472", name: "Chemical Train"},
                {id: 112, mp3: "songs/283472/12.mp3", album: "283472", name: "Disco Reprise"},
                {id: 113, mp3: "songs/283472/13.mp3", album: "283472", name: "Kraftwagen"},
                {id: 114, mp3: "songs/283472/14.mp3", album: "283472", name: "Low Down"},
                {id: 115, mp3: "songs/283472/15.mp3", album: "283472", name: "Lower East"},
                {id: 116, mp3: "songs/283472/16.mp3", album: "283472", name: "Cricket Post"},
                {id: 117, mp3: "songs/283472/17.mp3", album: "283472", name: "Disco (Train Fever Main Menu Theme)"}
            ];
        break;
        case 238425:
            album = [
                {id: 539, mp3: "songs/238425/1.mp3", album: "238425", name: "Skyfall"}
            ];
        break;
        case 418854:
            album = [
                {id: 844, mp3: "songs/418854/1.mp3", album: "418854", name: "Ki"},
                {id: 845, mp3: "songs/418854/2.mp3", album: "418854", name: "Alpha"},
                {id: 846, mp3: "songs/418854/3.mp3", album: "418854", name: "Dead Voxel"},
                {id: 847, mp3: "songs/418854/4.mp3", album: "418854", name: "Blind Spots"},
                {id: 848, mp3: "songs/418854/5.mp3", album: "418854", name: "Flake"},
                {id: 849, mp3: "songs/418854/6.mp3", album: "418854", name: "Concrete Halls"},
                {id: 850, mp3: "songs/418854/7.mp3", album: "418854", name: "Moog City 2"},
                {id: 851, mp3: "songs/418854/8.mp3", album: "418854", name: "Mutation"},
                {id: 852, mp3: "songs/418854/9.mp3", album: "418854", name: "Biome Fest"},
                {id: 852, mp3: "songs/418854/10.mp3", album: "418854", name: "Haunt Muskie"}
            ];
        break;
        case 945345:
            album = [
                {id: 459, mp3: "songs/945345/1.mp3", album: "945345", name: "Breakfast in America"},
                {id: 458, mp3: "songs/945345/2.mp3", album: "945345", name: "The Logical Song"}
            ];
        break;
        case 485345:
            album = [
                {id: 234, mp3: "songs/485345/1.mp3", album: "485345", name: "Rasputin"},
                {id: 235, mp3: "songs/485345/2.mp3", album: "485345", name: "Rivers of Babylon"}
            ];
        break;
        case 953452:
            album = [
                {id: 495, mp3: "songs/953452/1.mp3", album: "953452", name: "Head Over Heels"},
                {id: 496, mp3: "songs/953452/2.mp3", album: "953452", name: "Everybody Wants To Rule The World"}
            ];
        break;
        case 583459:
            album = [
                {id: 986, mp3: "songs/583459/1.mp3", album: "583459", name: "I Love You But I'm Lost"}
            ];
        break;
        case 348953:
            album = [
                {id: 395, mp3: "songs/348953/1.mp3", album: "348953", name: "Lessons In Love"}
            ];
        break;
        case 348954:
            album = [
                {id: 395, mp3: "songs/348954/1.mp3", album: "348954", name: "Something About You"}
            ];
        break;
    }

    return album;
}