import { LoginUserDto, RegisterUserDto } from "../utils/types/auth.dto";
import { registerSchema } from "../utils/validations/authValidation";
import { prisma } from "../database/config";
import bcrypt from "bcryptjs";

/**-----------------------------------------------
 * @desc    Sign up a user
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 ------------------------------------------------*/
export const signUp = async (request, response) => {
  try {
    const dto: RegisterUserDto = request.body;
    const validation = registerSchema.safeParse(dto);
    if (!validation.success) {
      return response.json({ message: validation.error.errors[0].message });
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (findUser) {
      return response.json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);
    const createUser = await prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: passwordHash,
        location: dto.location,
        phone: dto.phone,
      },
    });
    return response.json(createUser);
  } catch (error) {}
};

/**-----------------------------------------------
 * @desc    Sign in
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 ------------------------------------------------*/
export const loginUser = async (req, res) => {
  try {
    const dto: LoginUserDto = req.body;
    const validation = registerSchema.safeParse(dto);
    if (!validation.success) {
      return res.json({ message: validation.error.errors[0].message });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      return res.json({ message: "User already exists" });
    }
    const isPasswordMatch = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordMatch) {
      return res.json({ message: "invalid email or password" });
    }
    return res.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
  }
};
