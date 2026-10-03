/**
 * ============================================================
 *  YOUR PERSONAL CONFIGURATION ❤️
 * ============================================================
 *  Everything personal lives here: names, dates, every message,
 *  every letter and every media file. Edit the text below and
 *  the whole website updates — no other code needs to change.
 *
 *  Media files live in the /public folder:
 *    /public/audio/background-music.mp3  → romantic background music
 *  Replace it with your own (keep the same name, or change the
 *  path in `media` below).
 * ============================================================
 */

const config = {
  // ---------- Names & dates ----------
  // Leave a field empty ("") to hide it anywhere it would appear.
  partnerName: '', // e.g. 'Priya' — shown on the loading screen & tab title
  birthdayDate: '', // e.g. '14 October' — shown as a small badge on the birthday screen
  engagementDate: '', // e.g. '2 March 2026' — shown under the rings only if you fill it in

  pageTitle: 'A Little Surprise For You ❤️',

  // ---------- Media ----------
  media: {
    backgroundMusic: '/audio/background-music.mp3',
    musicVolume: 0.45,
  },

  loading: {
    line: 'Wrapping your surprise with love…',
  },

  // ---------- 1. Welcome ----------
  welcome: {
    title: 'Hey, My Favorite Person! ❤️',
    message:
      'I have been planning something special for you. Today is all about you, so forget everything else for a moment and come with me on a little journey.',
    button: 'Open Your Surprise ❤️',
  },

  // ---------- 2. Birthday wish ----------
  birthday: {
    banner: 'HAPPY BIRTHDAY',
    title: 'Happy Birthday, My Beautiful Soul! 🎂❤️',
    paragraphs: [
      'I wish I could be there today to see your smile and celebrate this beautiful day with you. But even from miles away, I want you to know that you are the most special part of my life.',
      'Today, I cannot give you a hug in person, but I can give you something that comes straight from my heart.',
    ],
    cakeHint: 'Close your eyes, make a wish… then tap the cake to blow out the candles 🕯️',
    next: 'Continue the Journey',
  },

  // ---------- 3. Conversations ----------
  conversations: {
    title: 'Who Knew That a Few Messages Could Mean So Much?',
    chatHeader: 'My Favorite Person',
    chatStatus: 'online',
    // side: 'me' = right bubble, 'you' = left bubble
    messages: [
      { side: 'me', text: 'It started with a simple hello...' },
      { side: 'you', text: 'Then came the conversations I never wanted to end.' },
      { side: 'me', text: 'Somehow, your messages became my favorite notification.' },
      { side: 'you', text: 'Even on ordinary days, talking to you makes everything feel special.' },
      { side: 'me', text: 'We may not have met yet, but you have already become such an important part of my world. ❤️' },
    ],
    next: 'Continue',
  },

  // ---------- 4. Engagement ----------
  engagement: {
    title: 'From Two Strangers to a Promise of Forever 💍',
    paragraphs: [
      'We may have started as two people brought together by destiny, but today, you are someone I genuinely look forward to sharing my life with.',
      'Our engagement was not just a ceremony. It was the beginning of a beautiful promise — a promise to understand each other, support each other, grow together, and create a lifetime of happiness.',
    ],
    ringHint: 'Tap the rings 💍',
    ringReveal: 'One promise. Two hearts. A lifetime to go. ❤️',
    replay: 'Play again ↻',
    forever: 'Forever',
    next: 'Continue',
  },

  // ---------- 5. Future — the firsts we are waiting for ----------
  // scene: meeting | conversation | picture | hug | celebration | tea | drive
  future: {
    title: 'वो खूबसूरत पल, जिन्हें तुम्हारे साथ जीने का मुझे बेसब्री से इंतज़ार है।',
    note: 'So many firsts… with you',
    revealLabel: 'Click to reveal',
    // Pictures live in /public/images/firsts — swap any file for your own (same name).
    // focus = which part of a wide picture stays visible on small screens (0% left … 100% right)
    heroImage: '/images/firsts/hero.jpg',
    heroFocus: '42%',
    items: [
      {
        scene: 'meeting',
        image: '/images/firsts/meeting.jpg',
        focus: '45%',
        title: 'Our First Meeting',
        reveal: "I already know I'll be the first one to smile when we finally meet — and I won't be able to stop. ❤️",
      },
      {
        scene: 'conversation',
        image: '/images/firsts/conversation.jpg',
        focus: '38%',
        title: 'Our First Real Conversation',
        reveal: 'First topic: everything we never had time to say before the call ended.',
      },
      {
        scene: 'picture',
        image: '/images/firsts/picture.jpg',
        focus: '35%',
        title: 'Our First Picture Together',
        reveal: 'You smiling at the camera, and me looking at you instead.',
      },
      {
        scene: 'hug',
        image: '/images/firsts/hug.jpg',
        focus: '42%',
        title: 'Our First Hug',
        reveal: 'And when that moment finally comes, I hope neither of us wants to let go. ❤️',
      },
      {
        scene: 'celebration',
        image: '/images/firsts/celebration.jpg',
        focus: '55%',
        title: 'Our First Celebration',
        reveal: 'Your candles, your wish — and me right beside you, every single year.',
      },
      {
        scene: 'tea',
        image: '/images/firsts/tea.jpg',
        focus: '50%',
        title: 'Our First Tea Together',
        reveal: 'Two cups, one table, and a whole life to share together. ❤️',
      },
      {
        scene: 'drive',
        image: '/images/firsts/drive.jpg',
        focus: '40% 42%', // optional 2nd value = vertical (0% top … 100% bottom)
        title: 'Our First Long Drive Together',
        reveal: 'You choose the songs, I will drive. Deal?',
      },
    ],
    next: 'Continue',
  },

  // ---------- 6. Mystery gift ----------
  mystery: {
    teaser: 'One More Little Surprise for You… 🎁❤️',
    hint: 'Tap the box',
    // shown one by one in a glowing note after the box opens
    paragraphs: [
      'I put a little piece of my heart, effort, and creativity into making this just for you.',
      'It may not be perfect, but every little detail was made with love and a genuine wish to make your birthday a little more special. ✨',
      'I hope you like my little effort, and most importantly, I hope it brings a beautiful smile to your face. 😊❤️',
    ],
    wishLine: 'Happy Birthday once again! 🎂💕',
    button: 'Read My Final Message ❤️',
  },

  // ---------- 7. Final message ----------
  final: {
    // Revealed one line at a time.
    lines: [
      'Happy Birthday, My Love. ❤️',
      'यह सोचकर थोड़ा अजीब और खूबसूरत सा लगता है कि कोई इंसान बिना हमारे पास physically मौजूद हुए भी हमारी ज़िंदगी में इतना महत्वपूर्ण बन सकता है।',
      'हमारी शुरुआत सिर्फ़ बातचीत से हुई थी, लेकिन पता ही नहीं चला कि कब तुम मेरे लिए एक ऐसे इंसान बन गए जिसकी मुझे सच में परवाह है, जिससे बात करने का मैं इंतज़ार करता हूँ और जिसे मैं आने वाले अपने हर खूबसूरत पल में अपने साथ देखना चाहता हूँ।',
      'मुझे पता है कि अभी हमारी एक पूरी यात्रा बाकी है। हमारी पहली मुलाकात, हमारी पहली यादें और ज़िंदगी के अनगिनत खूबसूरत पल अभी हमारा इंतज़ार कर रहे हैं।',
      'लेकिन आज मैं बस तुम्हें सेलिब्रेट करना चाहता हूँ — तुम्हें, जैसे तुम हो; उस खुशी को, जो तुम मेरी ज़िंदगी में लेकर आए हो; और उस खूबसूरत भविष्य को, जिसे हम साथ मिलकर बना रहे हैं।',
      'मैं उम्मीद करता हूँ कि तुम्हारा जन्मदिन ढेर सारी मुस्कुराहटों, सुकून और उन सभी चीज़ों से भरा हो, जिनकी तुम्हारा दिल ख्वाहिश करता है।',
      'और जब वह दिन आएगा, जब हम अपना जन्मदिन या कोई खास पल एक-दूसरे के साथ बैठकर सेलिब्रेट करेंगे, तब मैं चाहता हूँ कि हम पीछे मुड़कर देखें और याद करें कि हमारी कहानी कितनी खूबसूरती से शुरू हुई थी।',
      'तब तक बस इतना याद रखना — तुम मेरे लिए बहुत खास हो। ❤️',
      'Happy Birthday, My Forever Person. ❤️',
    ],
    closing: 'With all my love',
    lineDelayMs: 2600, // shortest wait between lines
    msPerChar: 38, // longer lines stay on screen longer before the next appears
    replay: 'Start Our Story Again',
    skip: 'Show everything',
  },

  // Chapter names used by the progress indicator
  chapters: ['Welcome', 'Your Day', 'Our Words', 'Our Promise', 'Our Future', 'One More', 'From My Heart'],
}

export default config
