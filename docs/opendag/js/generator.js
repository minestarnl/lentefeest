'use strict'

function song(songa) {
    return `
    <li class="collection-item avatar waves-effect waves-light song remove-border" onclick="change('${songa.link}')">
    <i class="material-icons circle purple darken-4">play_arrow</i>
    <span class="title"><b>${songa.name}</b></span>
    <p>Door ${songa.year}<br><i> Nummer ${songa.number}</i>
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
    constructor(link, year, name, number) {
        this.link = link
        this.year = year
        this.name = name
        this.number = number
    }
}

class Year {
    constructor(year) {
        this.year = year
        this.songs = []
    }

    addSong(song) {
        this.songs.push(song)
        return this
    }
}

var dancehall = new Year('Dancehall')
    .addSong(new Song(`Dans/Dans/Dancehall/Charly Black & J Capri - Whine & Kotch (Official Music Video).mp3`, 'Black & J Capri', 'Whine & Kotch', 1))
    .addSong(new Song(`Dans/Dans/Dancehall/Konshens - Bruk off yuh back - Moscato riddim - Dancehall 2016.mp3`, 'Konshens', 'Bruk off yuh back', 2))
    .addSong(new Song(`Dans/Dans/Dancehall/New Olatunji - BAM BAM [2013 Trinidad Soca][Soca Salsa Riddim, StarBlu Ent & Millbeatz Ent].mp3`, 'new Olatunji', 'BAM BAM', 3))
    .addSong(new Song(`Dans/Dans/Dancehall/Reekado Banks Ft Tiwa Savage-Turn It Up- Mosik [Hot Reggae].mp3`, 'Reekado Banks Ft Tiwa Savage', 'Turn it up', 4))
    .addSong(new Song(`Dans/Dans/Dancehall/Rihanna - Work ft. Drake (lyrics).mp3`, 'Rihanna Ft Drake', 'Work', 5)),

    freestyle = new Year('Freestyle')
    .addSong(new Song(`Dans/Dans/Freestyle/24K Magic - Bruno Mars.mp3`, 'Bruno Mars', '24K Magic', 1))
    .addSong(new Song(`Dans/Dans/Freestyle/Bitch Better Have My Money - Rihanna.mp3`, 'Rihanna', 'Bitch Better Have My Money', 2))
    .addSong(new Song(`Dans/Dans/Freestyle/Cant Stop the Feeling - Justin Timberlake.mp3`, 'Justin Timberlake', "Cant stop the Feeling", 3))
    .addSong(new Song(`Dans/Dans/Freestyle/Hips Dont Lie - Shakira.mp3`, 'Shakira', "Hips Dont Lie", 4))
    .addSong(new Song(`Dans/Dans/Freestyle/One Dance - Drake.mp3`, 'Drake', 'One Dance', 5))
    .addSong(new Song(`Dans/Dans/Freestyle/Policeman - Eva Simons ft. Konshens.mp3`, 'Eva Simons Ft Konshens', 'Policeman', 6))
    .addSong(new Song(`Dans/Dans/Freestyle/Run The World - Beyoncé.mp3`, 'Beyoncé', 'Run The World', 7))
    .addSong(new Song(`Dans/Dans/Freestyle/Side To Side - Ariana Grande.mp3`, 'Ariana Grande', 'Side to Side', 8)),

    oldskool = new Year('Oldskool hiphop')
    .addSong(new Song(`Dans/Dans/Oldskool hiphop/Get Your Freak On- Missy Elliot.mp3`, 'Missy Elliot', 'Get Your Freak On', 1))
    .addSong(new Song(`Dans/Dans/Oldskool hiphop/Kelis - Milkshake.mp3`, 'Kelis', 'Milkshake', 2))
    .addSong(new Song(`Dans/Dans/Oldskool hiphop/Usher - Yeah! ft. Lil Jon, Ludacris.mp3`, 'Usher Ft Lil Jon, Ludacris', "Yeah!", 3))
    .addSong(new Song(`Dans/Dans/Oldskool hiphop/Wiggle - Jason DerÃ¼lo Ft. Snoop Dogg - Official Audio.mp3`, 'Jason Derulo Ft Snoop dogg', "Wiggle", 4)),

    extra = new Year('Extra')
    .addSong(new Song(`Dans/Dans/extra/I Wanna Dance With Somebody from the World Premiere Cast recording of The Bodyguard.mp3`, 'The bodyguard', 'I wanna dance with somebody', 1))
    .addSong(new Song(`Dans/Dans/extra/Danza Kuduro - Don Omar ft Lucenzo letra (lyrics).mp3`, 'Don Omar Ft Lucenzo letra', 'Danza Kuduro', 2))
    .addSong(new Song(`Dans/Dans/extra/Locked Away Lyrics - R City ft. Adam Levine (Lyric Video) HD.mp3`, 'R City Ft Adam Levine', "Locked Away", 3))

var years = [
    dancehall, freestyle, oldskool, extra
]

// var years = [
//     y2019, y2018, y2017MLF, y2017, y2016, y2015, y2014, dancehall
// ]

function generateAllHTML() {
    var w = []
    years.forEach((yearr) => {
        w.push(section(yearr))
    })
    return w.join('')
}

document.querySelector('#songsListings').innerHTML = generateAllHTML()