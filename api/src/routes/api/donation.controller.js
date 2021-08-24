const router = require("express").Router();
const asyncHandler = require("../middlewares/asyncRouteHandler");
const joiValidator = require("../../helpers/joiValidator.helper");
const donationsService = require("../../services/donation.services");
const donationSchemas = require("../../helpers/validators/donation.validators");
const apiResponse = require("../../helpers/responseSender.helper");
const { deleteDoner } = require("../../services/donation.services");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const donations = await donationsService.getAllDonations(req.query);
    return apiResponse.sendSuccessResponse(
      res,
      donations,
      "Donations found successfully"
    );
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { error } = donationSchemas.donationSchema.validate(req.body);

    if (error) {
      return apiResponse.sendValidationError(res, error.details[0].message);
    }
    const { donationBy } = req.body;

    const donationPerson = await donationsService.getDonationPerson(donationBy);

    if (!donationPerson)
      return apiResponse.sendValidationError(res, [
        "Donation person id not found",
      ]);

    const newDonation = await donationsService.createDonation(req.body);
    return apiResponse.sendSuccessResponse(
      res,
      newDonation,
      "Donation added successfully"
    );
  })
);

router.put(
  "/:donationId",
  asyncHandler(async (req, res) => {
    const { error } = donationSchemas.donationSchema.validate(req.body);

    if (error) {
      return apiResponse.sendValidationError(res, error.details[0].message);
    }
    const { donationBy } = req.body;

    const donationPerson = await donationsService.getDonationPerson(donationBy);

    if (!donationPerson)
      return apiResponse.sendValidationError(res, [
        "Donation person id not found",
      ]);

    const isDonationUpdated = await donationsService.updateDonation(
      req.params.donationId,
      req.body
    );

    if (!isDonationUpdated)
      return apiResponse.sendValidationError(res, ["Donation id not found"]);

    return apiResponse.sendSuccessResponse(
      res,
      {},
      "Donation updated successfully"
    );
  })
);

router.delete(
  "/:donationId",
  asyncHandler(async (req, res) => {
    const { donationId } = req.params;

    const isDonationDeleted = await donationsService.deleteDonation(donationId);

    if (!isDonationDeleted)
      return apiResponse.sendValidationError(res, ["Donation not found"]);

    return apiResponse.sendSuccessResponse(
      res,
      {},
      "Donation deleted successfully"
    );
  })
);

router.get(
  "/doner",
  asyncHandler(async (req, res) => {
    const allDonationPerson = await donationsService.getAllDonationPerson(
      req.query
    );

    return apiResponse.sendSuccessResponse(
      res,
      allDonationPerson,
      "Doners found successfully"
    );
  })
);
router.post(
  "/doner",
  asyncHandler(async (req, res) => {
    const { error } = donationSchemas.donationPersonSchema.validate(req.body);

    if (error) {
      return apiResponse.sendValidationError(res, error.details[0].message);
    }

    const newDonationUser = await donationsService.createDonationPerson(
      req.body
    );

    return apiResponse.sendSuccessResponse(
      res,
      newDonationUser,
      "Doner created successfully"
    );
  })
);

router.put(
  "/doner/:donerId",
  asyncHandler(async (req, res) => {
    const { error } = donationSchemas.donationPersonSchema.validate(req.body);

    if (error) {
      return apiResponse.sendValidationError(res, error.details[0].message);
    }

    const isDonerUpdated = await donationsService.updateDoner(
      req.params.donerId,
      req.body
    );

    if (!isDonerUpdated)
      return apiResponse.sendValidationError(res, ["Doner not found"]);

    return apiResponse.sendSuccessResponse(
      res,
      {},
      "Doner updated successfully"
    );
  })
);

router.delete(
  "/doner/:donerId",
  asyncHandler(async (req, res) => {
    const { donerId } = req.params;

    const donations = await donationsService.getAllDonations({
      donationBy: donerId,
    });
    if (donations.length)
      return apiResponse.sendValidationError(res, [
        "Please delete doner's donations first",
      ]);

    const isDonerDeleted = await donationsService.deleteDoner(
      req.params.donerId
    );

    if (!isDonerDeleted)
      return apiResponse.sendValidationError(res, ["Doner not found"]);

    return apiResponse.sendSuccessResponse(
      res,
      {},
      "Doner deleted successfully"
    );
  })
);

module.exports = router;
