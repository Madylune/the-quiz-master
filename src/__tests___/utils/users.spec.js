import { setPlayers, setPlayerTurn } from '../../utils/users'

describe('setPlayers', () => {
  it('without loser - should return an array of players', () => {
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

  it('with loser - should return an array of players', () => {
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

describe('setPlayerTurn', () => {
  it('should return user turn id', () => {
    const playerTurn = 'lRxPNlxyeXMJKRCoRC5rt8Jv8xt2'
    const players = [
      {
        id: "pBafuvswTqTzNcGoNIPl5D4mqKa2",
        name: "Julie",
        canPlay: true
      },
      {
        id: "lRxPNlxyeXMJKRCoRC5rt8Jv8xt2",
        name: "Romain",
        canPlay: true
      }
    ]
    expect(setPlayerTurn(players, playerTurn)).toEqual('pBafuvswTqTzNcGoNIPl5D4mqKa2')
  })

  it('should return user turn id', () => {
    const playerTurn = 'lRxPNlxyeXMJKRCoRC5rt8Jv8xt2'
    const players = [
      {
        id: "pBafuvswTqTzNcGoNIPl5D4mqKa2",
        name: "Julie",
        canPlay: true
      },
      {
        id: "lRxPNlxyeXMJKRCoRC5rt8Jv8xt2",
        name: "Romain",
        canPlay: true
      },
      {
        id: "jRxPNlxyekzMJKRCoRC5rt7Jv8xt1",
        name: "Popo",
        canPlay: false
      }
    ]
    expect(setPlayerTurn(players, playerTurn)).toEqual('pBafuvswTqTzNcGoNIPl5D4mqKa2')
  })
})