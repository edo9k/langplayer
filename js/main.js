/** @format */

/* things to play with
 *
 * theplayer.playbackRate
 *
 * started / ended playing (to follow up with next track
 * show information about tracks
 * randomize order
 * buttons for interface
 * customizaton controls (how long tracks should be, which languages to use)
 * persist configuration
 * do not play recently played tracks (depends on persistance)
 * share buttons?
 * using object could give us more information and avoid playing two files of the same language in sequence
 * instead of an array use { name: 'meh', url: 'meh', info: 'meh', otherDescriptionStuff: 'meh'
 *
 */

const { random, round } = Math

const urls = [
  /* german   */ 'http://newsinslowgerman.libsyn.com/rss',
  /* italian  */ 'http://nsi.libsyn.com/rss',
  /* spanish  */ 'http://nsslatino.libsyn.com/rss',
  /* french   */ 'http://nsf.libsyn.com/rss'

  /*
   * japanese?
   * esperanto?
   * arabic?
   */
]

let podcastFiles = []

const getTracks = urlList =>
  urlList.forEach(url =>
    fetch(url)
      .then(res => res.text())
      .then(html => podcastFiles.push(...html.match(/url=".+\.mp3/).map(x => x.replace('url="', ''))))
      .catch(e => console.error('Deu ruim na hora de pegar os mp3.', e))
  )

const playOne = () => {
  const trackNumber = round(podcastFiles.length * random())
  theplayer.src = podcastFiles[trackNumber]
  theplayer.play()
}

getTracks(urls)

/* says hi */
console.log('hi @', new Date())
