const db = require("../database/models/index");
const Donation = db.Donation;
const DonationPerson = db.DonationPerson;

module.exports = {
  getAllDonations: async (query) => {
    const donation = await Donation.findAll({
      include: [DonationPerson],
      where: query,
      raw: true,
    });
    return donation;
  },
  getAllDonationPerson: async (query) => {
    const donationPerson = await DonationPerson.findAll({
      where: query,
    });
    return donationPerson;
  },
  createDonation: async (donation) => {
    const response = await Donation.create(donation);
    return response;
  },
  createDonationPerson: async (donationPerson) => {
    const response = await DonationPerson.create(donationPerson);
    return response;
  },

  getDonationPerson: async (id) => {
    const donationPerson = await DonationPerson.findOne({
      where: {
        id: id,
      },
    });
    if (donationPerson) return donationPerson.get();
    return null;
  },

  deleteDoner: async (donerId) => {
    const deletedDoner = await DonationPerson.destroy({
      where: {
        id: donerId,
      },
    });
    if (deletedDoner) return true;
    return false;
  },

  deleteDonation: async (donationId) => {
    const deletedDonations = await Donation.destroy({
      where: {
        id: donationId,
      },
    });
    if (deletedDonations) return true;
    return false;
  },

  updateDonation: async (donationId, data) => {
    const isDonationUpdated = await Donation.update(data, {
      where: {
        id: donationId,
      },
    });

    if (isDonationUpdated[0]) return true;
    return false;
  },

  updateDoner: async (donerId, data) => {
    const isDonerUpdated = await DonationPerson.update(data, {
      where: {
        id: donerId,
      },
    });

    if (isDonerUpdated[0]) return true;
    return false;
  },
};
