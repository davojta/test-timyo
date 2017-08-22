/* eslint quotes: 0, no-useless-escape: 0, comma-dangle: 0 */
const json = {
    'langs': [
        'en',
        'fr',
    ],

    'tones': {
        'en.reply.short.date': 'Reply · {date}',
        'en.reply.short.asap': 'Reply · ASAP',
        'en.reply.medium.date': 'Please <b>reply</b> by <b>{date}</b>',
        'en.reply.medium.asap': 'Please <b>reply</b> <b>ASAP</b>',
        'en.reply.long.date': 'A <b>reply</b> is not needed until <b>{date}</b>',
        'en.reply.long.asap': 'Urgent. Please <b>reply</b> <b>ASAP</b>',
        'en.read.short.date': 'Read · {date}',
        'en.read.short.asap': 'Read · ASAP',
        'en.read.medium.date': 'Please <b>read</b> by <b>{date}</b>',
        'en.read.medium.asap': 'Please <b>read</b> <b>ASAP</b>',
        'en.read.long.date': 'Please <b>read</b> by <b>{date}</b>. No reply needed',
        'en.read.long.asap': 'Please <b>read</b> <b>ASAP</b>. No reply needed',
        'en.todo.short.date': 'To do · {date}',
        'en.todo.short.asap': 'To do · ASAP',
        'en.todo.medium.date': 'Please <b>do</b> by <b>{date}</b>',
        'en.todo.medium.asap': 'Please <b>do</b> <b>ASAP</b>',
        'en.todo.long.date': 'Please <b>do</b> by <b>{date}</b>. No reply needed',
        'en.todo.long.asap': 'Please <b>do</b> <b>ASAP</b>. No reply needed',

        'fr.reply.short.date': 'Répondre d\'ici {date}',
        'fr.reply.short.asap': 'Répondre au plus vite',
        'fr.reply.medium.date': 'Répondre SVP pour <b>{date}</b>',
        'fr.reply.medium.asap': 'Répondre SVP <b>au plus vite</b>',
        'fr.reply.long.date': 'Pas de réponse attendue avant <b>{date}</b>',
        'fr.reply.long.asap': 'Urgent. Merci de répondre <b>au plus vite.</b>',
        'fr.read.short.date': 'A lire d\'ici {date}',
        'fr.read.short.asap': 'A lire au plus vite',
        'fr.read.medium.date': 'A lire SVP pour <b>{date}</b>',
        'fr.read.medium.asap': 'A lire SVP <b>au plus vite</b>',
        'fr.read.long.date': 'Merci de lire pour <b>{date}</b>. Pas de réponse attendue.',
        'fr.read.long.asap': 'Merci de lire pour <b>au plus vite</b>. Pas de réponse attendue.',
        'fr.todo.short.date': 'A faire pour {date}',
        'fr.todo.short.asap': 'A faire au plus vite',
        'fr.todo.medium.date': 'A faire SVP pour <b>{date}</b>',
        'fr.todo.medium.asap': 'A faire SVP <b>au plus vite</b>',
        'fr.todo.long.date': 'A faire SVP pour <b>{date}</b>. Pas de réponse attendue.',
        'fr.todo.long.asap': 'A faire SVP pour <b>au plus vite</b>. Pas de réponse attendue.',
    },
    'templates': {
        'expectation_header': '{when}: {emoji} {tone}. {ifcc}',
        'notify_sender_header_plain': '{notify_header_text}',
    },

    'ifcc': {
        'en': 'If Cc: read',
        'fr': 'En Cc: A lire.',
    },

    'when': {
        'en': 'When',
        'fr': 'Quand',
    },
}
;

export default json;
