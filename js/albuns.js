var owners = {
    8347283 : "Admiral James T.",
    1723349 : "Adele",
    4184959 : "C418",
    8553569 : "Supertramp",
    2938356 : "Boney M.",
    3945834 : "Tears For Fears",
    2382932 : "Level 42",
    8345734 : "Simply Red",
    2987293 : "Almost monday",
    2388482 : "Simple Minds",
    2984245 : "Dan Croll"
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
        name : "Breakfast In America (Deluxe Edition)",
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
    },
    586453 : {
        cover : "https://m.media-amazon.com/images/I/516xP6lT5oL._SX450_.jpg",
        name : "Stars",
        likes : 0,
        owner : 8345734
    },
    298528 : {
        cover : "https://i.scdn.co/image/ab67616d0000b27344ad2bbb75421d124e5310ce",
        name : "cool enough",
        likes : 0,
        owner : 2987293
    },
    485346 : {
        cover : "https://images-na.ssl-images-amazon.com/images/I/71FES3n3yGL.jpg",
        name : "Celebrate (Greatest Hits / Expanded Edition)",
        likes : 0,
        owner : 2388482
    },
    394856 : {
        cover : "https://i.scdn.co/image/ab67616d0000b27308005ba933e786b3d0d8156f",
        name : "From Nowhere",
        likes : 0,
        owner : 2984245
    }
}

function dados_albuns(id_album){

    let album = [];

    switch(id_album){
        case 238425:
            album = [
                {id: 539, mp3: "songs/238425/1.mp3", album: "238425", name: "Skyfall"}
            ];
        break;
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
                {id: 117, mp3: "songs/283472/17.mp3", album: "283472", name: "Disco (Train Fever Main Menu Theme)"},
                {id: 118, mp3: "songs/283472/18.mp3", album: "283472", name: "Cali One"},
                {id: 119, mp3: "songs/283472/19.mp3", album: "283472", name: "Big Boss"},
                {id: 120, mp3: "songs/283472/20.mp3", album: "283472", name: "Rumble Track"},
                {id: 121, mp3: "songs/283472/21.mp3", album: "283472", name: "Cocoon"},
                {id: 122, mp3: "songs/283472/22.mp3", album: "283472", name: "Harvest"}
            ];
        break;
        case 418854:
            album = [
                {id: 844, mp3: "songs/418854/1.mp3", album: "418854", name: "Ki"},
                {id: 845, mp3: "songs/418854/2.mp3", album: "418854", name: "Alpha"},
                {id: 846, mp3: "songs/418854/3.mp3", album: "418854", name: "Dead Voxel"},
                {id: 847, mp3: "songs/418854/4.mp3", album: "418854", name: "Blind Spots"},
                {id: 848, mp3: "songs/418854/5.mp3", album: "418854", name: "Flake"},
                {id: 849, mp3: "songs/418854/6.mp3", album: "418854", name: "Moog City 2"},
                {id: 850, mp3: "songs/418854/7.mp3", album: "418854", name: "Concrete Halls"},
                {id: 851, mp3: "songs/418854/8.mp3", album: "418854", name: "Mutation"},
                {id: 852, mp3: "songs/418854/9.mp3", album: "418854", name: "Biome Fest"},
                {id: 853, mp3: "songs/418854/10.mp3", album: "418854", name: "Haunt Muskie"},
                {id: 854, mp3: "songs/418854/11.mp3", album: "418854", name: "Warmth"},
                {id: 855, mp3: "songs/418854/12.mp3", album: "418854", name: "Floating Trees"},
                {id: 856, mp3: "songs/418854/13.mp3", album: "418854", name: "Aria Math"},
                {id: 857, mp3: "songs/418854/14.mp3", album: "418854", name: "Kyoto"},
                {id: 858, mp3: "songs/418854/15.mp3", album: "418854", name: "Ballad of the Cats"},
                {id: 859, mp3: "songs/418854/16.mp3", album: "418854", name: "Taswell"},
                {id: 860, mp3: "songs/418854/17.mp3", album: "418854", name: "Beginning 2"},
                {id: 861, mp3: "songs/418854/18.mp3", album: "418854", name: "Dreidon"},
                {id: 862, mp3: "songs/418854/19.mp3", album: "418854", name: "The End"},
                {id: 863, mp3: "songs/418854/20.mp3", album: "418854", name: "Chirp"},
                {id: 864, mp3: "songs/418854/21.mp3", album: "418854", name: "Wait"},
                {id: 865, mp3: "songs/418854/22.mp3", album: "418854", name: "Mellohi"},
                {id: 866, mp3: "songs/418854/23.mp3", album: "418854", name: "Stal"},
                {id: 867, mp3: "songs/418854/24.mp3", album: "418854", name: "Strad"},
                {id: 868, mp3: "songs/418854/25.mp3", album: "418854", name: "Eleven"},
                {id: 869, mp3: "songs/418854/26.mp3", album: "418854", name: "Ward"},
                {id: 870, mp3: "songs/418854/27.mp3", album: "418854", name: "Mall"},
                {id: 871, mp3: "songs/418854/28.mp3", album: "418854", name: "Blocks"},
                {id: 872, mp3: "songs/418854/29.mp3", album: "418854", name: "Far"},
                {id: 873, mp3: "songs/418854/30.mp3", album: "418854", name: "Intro"}
            ];
        break;
        case 945345:
            album = [
                {id: 458, mp3: "songs/945345/1.mp3", album: "945345", name: "Gone Hollywood"},
                {id: 459, mp3: "songs/945345/2.mp3", album: "945345", name: "The Logical Song"},
                {id: 460, mp3: "songs/945345/3.mp3", album: "945345", name: "Goodbye Stranger"},
                {id: 461, mp3: "songs/945345/4.mp3", album: "945345", name: "Breakfast in America"},
                {id: 462, mp3: "songs/945345/5.mp3", album: "945345", name: "Oh Darling"},
                {id: 463, mp3: "songs/945345/6.mp3", album: "945345", name: "Take The Long Way Home"},
                {id: 464, mp3: "songs/945345/7.mp3", album: "945345", name: "Lord Is It Mine"},
                {id: 465, mp3: "songs/945345/8.mp3", album: "945345", name: "Just Another Nervous Wreck"},
                {id: 466, mp3: "songs/945345/9.mp3", album: "945345", name: "Casual Conversations"},
                {id: 467, mp3: "songs/945345/10.mp3", album: "945345", name: "Child Of Vision"}
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
                {id: 396, mp3: "songs/348954/1.mp3", album: "348954", name: "Something About You"}
            ];
        break;
        case 586453:
            album = [
                {id: 385, mp3: "songs/586453/1.mp3", album: "586453", name: "Something Got Me Started"},
                {id: 386, mp3: "songs/586453/2.mp3", album: "586453", name: "Wonderland"}
            ];
        break;
        case 298528:
            album = [
                {id: 239, mp3: "songs/298528/1.mp3", album: "298528", name: "cool enough"}
            ];
        break;
        case 485346:
            album = [
                {id: 485, mp3: "songs/485346/1.mp3", album: "485346", name: "Don't You (Forget About Me)"}
            ];
        break;
        case 394856:
            album = [
                {id: 222, mp3: "songs/394856/1.mp3", album: "394856", name: "From Nowhere (Baardsen Remix)"}
            ];
        break;
    }

    return album;
}

// Usado para localizar as musicas nas playlists de forma rápida
var album_static = {
    348954 : [396],
    348953 : [395],
    583459 : [986],
    953452 : [495, 496],
    485345 : [234, 235],
    945345 : [458, 459, 460, 461, 462, 463, 464, 465, 466, 467],
    418854 : [844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873],
    238425 : [539],
    283472 : [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122],
    586453 : [385, 386],
    298528 : [239],
    485346 : [485],
    394856 : [222]
}