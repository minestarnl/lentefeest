'use strict'

function song(songa) {
    return `
    <li class="collection-item avatar waves-effect waves-light song remove-border" onclick="change('${songa.link}')">
    <i class="material-icons circle purple darken-4">play_arrow</i>
    <span class="title"><b>${songa.name}</b></span>
    <p>Lentefeest ${songa.year}<br><i> Dans ${songa.number}</i>
    </p>
    </li>
`
}

var section = (Year) => {
    return `<ul id="songsListings" class="collapsible popout">
        <li class="remove-border">
            <div class="collapsible-header remove-border"><i class="material-icons">date_range</i>${Year.year}</div>
            <div class="collapsible-body remove-border">
                <ul class="collection">
                    <!-- add a song -->
                    ${getSongs(Year)}
                </ul>
            </div>
        </li>
    </ul>
    `
}

const getSongs = (Year) => {
    var els = []
    Year.songs.forEach((el) => {
        els.push(song(el))
    })
    return els.join('')
}

class Song {
    link;
    year;
    name;
    number;
    constructor(link, year, name, number) {
        this.link = link;
        this.year = year;
        this.name = name;
        this.number = number;
    }
}

class Year {
    year;
    songs;
    constructor(year) {
        this.year = year;
        this.songs = [];
    }

    addSong(song) {
        this.songs.push(song);
        return this
    }
}

var y2014 = new Year(2014)
    .addSong(new Song(`Dans/Dans/Dans 2014/LF 14 Laag 2 Rockmix.mp3`, 2014, 'Rockmix', 1))
    .addSong(new Song(`Dans/Dans/Dans 2014/LF14 Dance Crew Gevaarlijke jongens.mp3`, 2014, 'Gevaarlijke Jongens', 2))
    .addSong(new Song(`Dans/Dans/Dans 2014/LF14 Laag 4 Jukebox Battle.mp3`, 2014, 'Jukebox Battle', 3)),

    y2015 = new Year(2015)
    .addSong(new Song(`Dans/Dans/Dans 2015/LF 15 Born in The USA.mp3`, 2015, 'Born in The USA', 1))
    .addSong(new Song(`Dans/Dans/Dans 2015/LF 15 Fifties Retro.mp3`, 2015, 'Fifties Retro', 2))
    .addSong(new Song(`Dans/Dans/Dans 2015/LF 15 Lethal deals.mp3`, 2015, 'Lethal deals', 3))
    .addSong(new Song(`Dans/Dans/Dans 2015/LF 15 Lethal Marriage.mp3`, 2015, 'Lethal Marriage', 4))
    .addSong(new Song(`Dans/Dans/Dans 2015/LF 15 Lethal Pain.mp3`, 2015, 'Lethal Pain', 5))
    .addSong(new Song(`Dans/Dans/Dans 2015/LF 15 Lethal Seduction.mp3`, 2015, 'Lethal Seduction', 6))
    .addSong(new Song(`Dans/Dans/Dans 2015/LF 15 Lethal Truth def.mp3`, 2015, 'Lethal Truth def', 7))
    .addSong(new Song(`Dans/Dans/Dans 2015/LF 15 Popoz def.mp3`, 2015, 'Popoz def', 8)),

    y2016 = new Year(2016)
    .addSong(new Song(`Dans/Dans/Dans 2016/LF 16 Discotheek.mp3`, 2016, 'Discotheek', 1))
    .addSong(new Song(`Dans/Dans/Dans 2016/LF 16 Golddiggers.mp3`, 2016, 'Golddiggers', 2))
    .addSong(new Song(`Dans/Dans/Dans 2016/LF 16 Kroeg.mp3`, 2016, 'Kroeg', 3))
    .addSong(new Song(`Dans/Dans/Dans 2016/LF 16 Time lapse.mp3`, 2016, 'Time lapse', 4))
    .addSong(new Song(`Dans/Dans/Dans 2016/LF 16 Living Art.mp3`, 2016, 'Living Art', 5)),

    y2017 = new Year(2017)
    .addSong(new Song(`Dans/Dans/Dans 2017/LF17 01 Fun-eral .mp3`, 2017, 'Fun-eral', 1))
    .addSong(new Song(`Dans/Dans/Dans 2017/LF17 02 From Paris With Love.mp3`, 2017, 'From Paris With Love', 2))
    .addSong(new Song(`Dans/Dans/Dans 2017/LF17 03 Trojan Battle.mp3`, 2017, 'Trojan Battle', 3))
    .addSong(new Song(`Dans/Dans/Dans 2017/LF17 04 Heroic Sailing.mp3`, 2017, 'Heroic Sailing', 4))
    .addSong(new Song(`Dans/Dans/Dans 2017/LF17 05 Olympic Seduction.mp3`, 2017, 'Olympic Seduction', 5))
    .addSong(new Song(`Dans/Dans/Dans 2017/LF17 06 DD Fallen Stars.mp3`, 2017, 'DD Fallen Stars', 6)),

    y2017MLF = new Year('2017 MLF')
    .addSong(new Song(`Dans/Dans/Dans MLF 2017/MLF17 Generation .mp3`, 2018, 'Generation', 1))
    .addSong(new Song(`Dans/Dans/Dans MLF 2017/MLF17 Personal.mp3`, 2018, 'Personal', 2))
    .addSong(new Song(`Dans/Dans/Dans MLF 2017/MLF17 Seasons of Love.mp3`, 2018, 'Seasons of Love', 3)),

    y2018 = new Year(2018)
    .addSong(new Song(`Dans/Dans/Dans 2018/LF18 Down The Rabbithole.mp3`, 2018, 'Down The Rabbithole', 1))
    .addSong(new Song(`Dans/Dans/Dans 2018/LF18 Dark Woods (Part I).mp3`, 2018, 'Dark Woods (Part I)', 2))
    .addSong(new Song(`Dans/Dans/Dans 2018/LF18 Dark Woods (Part II).mp3`, 2018, 'Dark Woods (Part II)', 3))
    .addSong(new Song(`Dans/Dans/Dans 2018/LF18 Half Time Show.mp3`, 2018, 'Half Time Show', 4))
    .addSong(new Song(`Dans/Dans/Dans 2018/LF18 Queen of Hearts.mp3`, 2018, 'Queen of Hearts', 5))
    .addSong(new Song(`Dans/Dans/Dans 2018/LF18 Docentendans.mp3`, 2018, 'Docentendans', 6))
    .addSong(new Song(`Dans/Dans/Dans 2018/LF18 Royalty.mp3`, 2018, 'Royalty', 7)),

    y2019 = new Year(2019)
    .addSong(new Song(`Dans/Dans/Dans 2019/Dans 1 LF 1819.mp3`, 2019, 'Dans 1 LF', 1))
    .addSong(new Song(`Dans/Dans/Dans 2019/Dans 2 LF 1819.mp3`, 2019, 'Dans 2 LF', 2))
    .addSong(new Song(`Dans/Dans/Dans 2019/Dans 3 LF 1819.mp3`, 2019, 'Dans 3 LF', 3))
    .addSong(new Song(`Dans/Dans/Dans 2019/Dans 4 LF 1819.mp3`, 2019, 'Dans 4 LF', 4))
    .addSong(new Song(`Dans/Dans/Dans 2019/Dans 5 LF 1819.mp3`, 2019, 'Dans 5 LF', 5))
    .addSong(new Song(`Dans/Dans/Dans 2019/Docenten LF 1819.mp3`, 2019, 'DD Pyjama party', 6))

var years = [
    y2019, y2018, y2017MLF, y2017, y2016, y2015, y2014,
]

function generateAllHTML() {
    var w = []
    years.forEach((yearr) => {
        w.push(section(yearr))
    })
    return w.join('')
}

document.querySelector('#songsListings').innerHTML = generateAllHTML()