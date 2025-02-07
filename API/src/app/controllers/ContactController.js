const ContactRepository = require('../Repositorry/ContactRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactControllers {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

    response.json(contacts);
    // Listar todos os registros
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact Not fount' });
    }
    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category ' });
    }

    if (email) {
      const contactExists = await ContactRepository.findByEmail(email);
      if (contactExists) {
        return response.status(400).json({ error: 'This e-mail is alredy been taken' });
      }
    }

    const contact = await ContactRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });
    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category ' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (email) {
      const contactByEmail = await ContactRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({ error: 'This e-mail is alredy in use' });
      }
    }

    const contact = await ContactRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });
    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    await ContactRepository.delete(id);

    response.sendStatus(204);
  }
}
// singleton
module.exports = new ContactControllers();
