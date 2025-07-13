import { Op } from "sequelize";
import { User } from "../models/index.js";

const deleteInactiveUsers = async () => {
    const now = new Date();
    const expirationTime = new Date(now.getTime() - 72 * 60 * 60 * 1000);

    try {
            const deletedCount = await User.destroy({
            where: {
                isActive: false,
                createdAt: { [Op.lt]: expirationTime }
            }
        });

        console.log(`Deleted ${deletedCount} inactive accounts`);
    } catch (err) {
        console.error("Cleanup failed:", err);
    }
};

export { deleteInactiveUsers };