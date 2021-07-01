const { HttpCode } = require('../helpers/constants')
const { ContactsService } = require('../services')

const contactsService = new ContactsService()

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsService.getAll()
    res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contacts } })
  } catch (error) {
    next(error)
  }
}

const getByID = async (req, res, next) => {
  try {
    const cat = await contactsService.getByID(req.params)
    if (cat) {
      res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { cat } })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const create = (req, res, next) => {}
const update = (req, res, next) => {}
const remove = (req, res, next) => {}

console.log(HttpCode, contactsService)

module.exports = {
  getAll,
  getByID,
  create,
  update,
  remove,
}
