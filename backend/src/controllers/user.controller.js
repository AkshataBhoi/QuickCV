import User from "../models/User.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * @desc Update user profile (firstName, lastName)
 * @route PUT /api/users/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      avatarUrl,
      location,
      phone,
      email: emailFromPayload,
    } = req.body;

    const firebaseUid = req.user?.uid;
    const email = (emailFromPayload || req.user?.email || "").toLowerCase();

    console.log(">>> Update Profile:", {
      firebaseUid,
      email,
      firstName,
      lastName,
      hasAvatar: !!avatarUrl,
    });

    if (!firebaseUid) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Firebase UID missing",
      });
    }

    // Validate inputs
    if (firstName !== undefined && typeof firstName !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "First name must be a string" });
    }

    if (lastName !== undefined && typeof lastName !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Last name must be a string" });
    }

    // Find user using firebaseUid or email
    let user = await User.findOne({
      $or: [{ firebaseUid }, ...(email ? [{ email }] : [])],
    });

    // If user doesn't exist → create one
    if (!user) {
      console.log(">>> Creating new user for Firebase UID:", firebaseUid);

      user = await User.create({
        firebaseUid,
        email,
        firstName: firstName || "",
        lastName: lastName || "",
        name: `${firstName || ""} ${lastName || ""}`.trim(),
        avatarUrl: avatarUrl || "",
        location: location || "",
        phone: phone || "",
        plan: "free",
        coverLetterCredits: 0,
        resumeDownloadCredits: 1,
      });
    } else {
      // Update fields only if provided
      if (firstName !== undefined) user.firstName = firstName;
      if (lastName !== undefined) user.lastName = lastName;
      if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
      if (location !== undefined) user.location = location;
      if (phone !== undefined) user.phone = phone;

      // Sync Firebase UID if different or missing
      if (user.firebaseUid !== firebaseUid) {
        console.log(
          `>>> Syncing Firebase UID on Update from ${user.firebaseUid} -> ${firebaseUid}`
        );
        user.firebaseUid = firebaseUid;
      }

      // Sync full name
      user.name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

      await user.save();
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};

/**
 * @desc Get current user profile
 * @route GET /api/users/profile
 */
export const getProfile = async (req, res) => {
  try {
    const firebaseUid = req.user?.uid || req.headers["x-user-id"];
    const email = (req.user?.email || "").toLowerCase();

    console.log(">>> Get Profile Lookup:", { firebaseUid, email });

    if (!firebaseUid) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    let user = await User.findOne({
      $or: [{ firebaseUid }, ...(email ? [{ email }] : [])],
    });

    if (user) {
      console.log(">>> Found User:", {
        id: user._id,
        existingFirebaseUid: user.firebaseUid,
        existingEmail: user.email,
      });

      if (user.firebaseUid !== firebaseUid) {
        console.log(
          `>>> Syncing Firebase UID from ${user.firebaseUid} -> ${firebaseUid}`
        );
        user.firebaseUid = firebaseUid;
        await user.save();
      }
    } else {
      console.log(">>> Creating new user for Firebase UID:", firebaseUid);
      user = await User.create({
        firebaseUid,
        email,
        name: req.user?.name || "User",
        avatarUrl: req.user?.picture || "",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(">>> Get Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

/**
 * @desc Upgrade user to premium for demo/social share
 * @route POST /api/users/upgrade-demo
 */
export const upgradeDemo = async (req, res) => {
  try {
    const firebaseUid = req.user?.uid;
    console.log(">>> Upgrade Demo for UID:", firebaseUid);

    if (!firebaseUid) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findOneAndUpdate(
      { firebaseUid },
      {
        plan: "premium",
        coverLetterCredits: 10,
        resumeDownloadCredits: 7,
      },
      { new: true, upsert: true },
    );

    return res.status(200).json({
      success: true,
      data: user,
      message: "Successfully upgraded to Premium!",
    });
  } catch (error) {
    console.error("Upgrade Demo Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to upgrade plan",
    });
  }
};
