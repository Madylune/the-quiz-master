import { setPlayers } from '../../utils/users'

describe('setPlayers', () => {
  it('should return an array of players', () => {
    const quizMaster = 'lRxPNlxyeXMJKRCoRC5rt8Jv8xt2'
    const users = [
      {
        avatar: "Char-2",
        createdAt: 1589372521909,
        id: "pBafuvswTqTzNcGoNIPl5D4mqKa2",
        lastUpdatedAt: 1589373269133,
        name: "Julie",
        online: true,
        sessionId: "-M7Cz-hJYltKumG6py0F",
      },
      {
        avatar: "Char-4",
        createdAt: 1589372536039,
        id: "lRxPNlxyeXMJKRCoRC5rt8Jv8xt2",
        lastUpdatedAt: 1589373268217,
        name: "Romain",
        online: true,
        sessionId: "-M7Cz-hJYltKumG6py0F"
      }
    ]
    expect(setPlayers({ quizMaster, users })).toEqual([
      {
        avatar: "Char-2",
        createdAt: 1589372521909,
        id: "pBafuvswTqTzNcGoNIPl5D4mqKa2",
        lastUpdatedAt: 1589373269133,
        name: "Julie",
        online: true,
        sessionId: "-M7Cz-hJYltKumG6py0F",
        canPlay: true
      }
    ])
  })

  it('should return an array of players with loser canPlay: false', () => {
    const loserId = 'pBafuvswTqTzNcGoNIPl5D4mqKa2'
    const quizMaster = 'lRxPNlxyeXMJKRCoRC5rt8Jv8xt2'
    const users = [
      {
        avatar: "Char-2",
        createdAt: 1589372521909,
        id: "pBafuvswTqTzNcGoNIPl5D4mqKa2",
        lastUpdatedAt: 1589373269133,
        name: "Julie",
        online: true,
        sessionId: "-M7Cz-hJYltKumG6py0F",
      },
      {
        avatar: "Char-4",
        createdAt: 1589372536039,
        id: "lRxPNlxyeXMJKRCoRC5rt8Jv8xt2",
        lastUpdatedAt: 1589373268217,
        name: "Romain",
        online: true,
        sessionId: "-M7Cz-hJYltKumG6py0F"
      }
    ]
    expect(setPlayers({ quizMaster, users, loserId })).toEqual([
      {
        avatar: "Char-2",
        createdAt: 1589372521909,
        id: "pBafuvswTqTzNcGoNIPl5D4mqKa2",
        lastUpdatedAt: 1589373269133,
        name: "Julie",
        online: true,
        sessionId: "-M7Cz-hJYltKumG6py0F",
        canPlay: false
      }
    ])
  })
})