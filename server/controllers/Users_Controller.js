'use strict'

const userModel = require('../models/User')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const tools = require('../config/utils/tools')
const MailServices = require('../config/utils/mailServices')
const mailTemplates = require('../config/utils/emailTemplates')

function signup(req, res) {
  // se busca primero para ver si no existe
  return userModel
    .findOne({ username: req.body.email })
    .then(userData => {
      if (userData) {
        const errorText =
          'El nombre de usuario que intenta registrar ya se encuentra utilizado.'
        throw errorText
      }
      return {}
    })
    .then(() => {
      const userPass = tools.encryptData(
        req.body.password,
        'aes256',
        'b33dd00',
        'contraseña'
      )

      if (!userPass) {
        const errorText =
          'Problemas al encriptar la contraseña, por favor inténtelo de nuevo.'
        throw errorText
      }

      const dataToSave = userModel({
        username: req.body.email,
        name: req.body.name,
        lastName: req.body.lastName,
        secondLastName: req.body.secondLastName,
        createdAt: moment(new Date()).format('DD-MMM-YYYY'),
        updateAt: moment(new Date()).format('DD-MMM-YYYY'),
        email: req.body.email,
        facebook: 0,
        google: 0,
        phone: req.body.phone,
        password: userPass,
        status: 0,
        verifiedAccount: 0,
        avatar: '',
        gender: req.body.gender,
      })
      // se salva el usuario
      return dataToSave.save().then(userSaved => userSaved)
    })
    .then(userSaved => {
      // se crea un token para el usuario
      const findBy = {
        _id: userSaved._id,
      }
      const tempToken = jwt.sign({ id: userSaved._id }, 'b33dd00')
      const tempUserData = {
        token: tempToken,
      }
      return userModel.update(findBy, tempUserData).then(() => {
        userSaved.token = tempToken
        return userSaved
      })
    })
    .then(userData => {
      MailServices.sendMail(
        {
          subject: 'Confirmación de Correo Electrónico',
          to: userData.email,
          isText: false,
          msn: mailTemplates.accountConfirmation({
            name: userData.name,
            lastName: userData.lastName,
            token: userData.token,
          }),
        },
        () => {
          res.status(200).json({
            id: userData.id,
            token: userData.token,
            username: userData.username,
            name: userData.name,
            lastName: userData.lastName,
            secondLastName: userData.secondLastName,
            createdAt: userData.createdAt,
            updateAt: userData.updateAt,
            email: userData.email,
            facebook: userData.facebook,
            google: userData.google,
            phone: userData.phone,
            password: userData.password,
            status: userData.status,
            verifiedAccount: userData.verifiedAccount,
            avatar: userData.avatar,
            gender: userData.gender,
          })
        }
      )
    })
    .catch(err => {
      // en caso de error se devuelve el error
      console.log(`${err}`)
      res.status(400).json({
        error: `${err}`,
      })
    })
}

function login(user) {
  return user
  // let user = ''
  // let pass = ''
  // if (req.body.email) {
  //   user = req.body.email
  // }
  // if (req.body.email) {
  //   pass = req.body.password
  // }
  // return userModel
  //   .findOne({ username: user })
  //   .then(userData => {
  //     if (!userData) {
  //       const errorText = 'El usuario con el que intenta ingresar no existe.'
  //       throw errorText
  //     }
  //     return userData
  //   })
  //   .then(userData => {
  //     const userPass = tools.encryptData(
  //       pass,
  //       'aes256',
  //       'b33dd00',
  //       'contraseña'
  //     )
  //     if (userData.password !== userPass) {
  //       const errorText = 'Usuario o contraseña invalidos.'
  //       throw errorText
  //     }
  //     // se crea un token para el usuario
  //     if (userData.status === 1 && userData.verifiedAccount === 1) {
  //       const tempToken = jwt.sign(
  //         {
  //           id: userData._id,
  //           test: 'probando',
  //         },
  //         'b33dd00'
  //       )

  //       res.status(200).json({
  //         id: userData.id,
  //         token: userData.token,
  //         username: userData.username,
  //         name: userData.name,
  //         lastName: userData.lastName,
  //         secondLastName: userData.secondLastName,
  //         createdAt: userData.createdAt,
  //         updateAt: userData.updateAt,
  //         email: userData.email,
  //         facebook: userData.facebook,
  //         google: userData.google,
  //         phone: userData.phone,
  //         password: userData.password,
  //         status: userData.status,
  //         verifiedAccount: userData.verifiedAccount,
  //         avatar: userData.avatar,
  //         gender: userData.gender,
  //       })
  //     } else if (userData.status !== 1) {
  //       const errorText =
  //         'El usuario con el que intenta ingresar no esta activo.'
  //       throw errorText
  //     } else if (userData.verifiedAccount !== 1) {
  //       const errorText =
  //         'El usuario con el que intenta ingresar no a verificado su cuenta.'
  //       throw errorText
  //     }
  //   })
  //   .catch(err => {
  //     // en caso de error se devuelve el error
  //     console.log(`${err}`)
  //     res.status(400).json({
  //       error: `${err}`,
  //     })
  //   })
}

function saveUser(user) {
  // se busca primero para ver si no existe
  return userModel
    .findOne({ username: user.username, email: user.email })
    .then(userData => userData)
    .then(userData => {
      if (userData) {
        return userData
      }
      // se crea un token para el usuario
      const tempToken = jwt.sign({ id: user.username }, 'b33dd00')
      user.token = tempToken
      const dataToSave = userModel(user)
      // se salva el usuario
      return dataToSave
        .save()
        .then(userSaved => userSaved)
        .then(() => userData)
        .catch(
          err =>
            // en caso de error se devuelve el error
            err
        )
    })
    .then(userData => ({
      id: userData.id,
      token: userData.token,
      username: userData.username,
      name: userData.name,
      lastName: userData.lastName,
      secondLastName: userData.secondLastName,
      createdAt: userData.createdAt,
      updateAt: userData.updateAt,
      email: userData.email,
      facebook: userData.facebook,
      google: userData.google,
      phone: userData.phone,
      password: userData.password,
      status: userData.status,
      verifiedAccount: userData.verifiedAccount,
      avatar: userData.avatar,
      gender: userData.gender,
    }))
    .catch(
      err =>
        // en caso de error se devuelve el error
        err
    )
}

function validateAccount(req, res) {
  if (!req.params.token) {
    return res.render('accountConfirmation', {
      isValid: false,
      type: 1,
    })
  }

  // se desencripta el token
  const decoded = jwt.verify(req.params.token, 'b33dd00')

  return userModel
    .findById(decoded.id)
    .then(userData => {
      if (!userData) {
        const errorObject = {
          type: 2,
        }
        throw errorObject
      } else if (userData.verifiedAccount === 1) {
        const errorObject = {
          type: 3,
        }
        throw errorObject
      }
      return userData
    })
    .then(userData => {
      const findBy = {
        _id: userData._id,
      }
      const tempUserData = {
        status: 1,
        verifiedAccount: 1,
      }
      return userModel.update(findBy, tempUserData).then(userUpdated => {
        if (userUpdated.ok !== 1) {
          const errorObject = {
            type: 4,
          }
          throw errorObject
        }
        userData.status = 1
        userData.verifiedAccount = 1
        return userData
      })
    })
    .then(() =>
      res.render('accountConfirmation', {
        isValid: true,
      })
    )
    .catch(err => {
      // en caso de error se devuelve el error
      console.log(`ERROR: ${err.type}`)
      return res.render('accountConfirmation', {
        isValid: false,
        type: err.type,
      })
    })
}

function resendMail(req, res) {
  // se busca primero para ver si no existe
  return userModel
    .findById(req.body.id)
    .then(userData => {
      if (!userData) {
        const errorText = 'El usuario que intenta buscar no existe.'
        throw errorText
      }
      return userData
    })
    .then(userData => {
      MailServices.sendMail(
        {
          subject: 'Confirmación de Correo Electrónico',
          to: userData.email,
          isText: false,
          msn: mailTemplates.accountConfirmation({
            name: userData.name,
            lastName: userData.lastName,
            token: userData.token,
          }),
        },
        resp => {
          if (resp.code === 200) {
            res.status(200).json({
              message:
                'Se envió un email al correo indicado, favor verificarlo para continuar!',
            })
          } else {
            res.status(500).json({
              message:
                'No se pudo enviar el email, favor verificar el email si es el correcto!',
            })
          }
        }
      )
    })
    .catch(err => {
      // en caso de error se devuelve el error
      console.log(`${err.message}`)
      res.status(400).json({
        error: `${err.message}`,
      })
    })
}

module.exports = {
  signup,
  login,
  saveUser,
  validateAccount,
  resendMail,
}
