import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user_profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Resume, ResumeDocument } from 'src/resumes/schemas/resume.schema';
import { UserProfile, UserProfileDocument } from './schemas/user_profile.schema';
import { IUser } from 'src/users/users.interface';


@Injectable()
export class UserProfilesService {

  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Resume.name)
    private ResumeModule: SoftDeleteModel<ResumeDocument>,

    @InjectModel(UserProfile.name)
    private UserProfilesModule: SoftDeleteModel<UserProfileDocument>
  ) { }


  async create(createUserProfileDto: CreateUserProfileDto, user: IUser, resumeId: String) {
    const { skills, level, isPublic } = createUserProfileDto;

    // Kiểm tra đầu vào
    if (!skills || !level || isPublic === undefined) {
      throw new BadRequestException('Missing input fields');
    }

    const [existResume, existingUser, existUserProfile] = await Promise.all([
      this.ResumeModule.findOne({ _id: resumeId }),
      this.userModel.findOne({ email: user.email }),
      this.UserProfilesModule.findOne({ userInfo: user.email })
    ]);

    if (!existResume) {
      throw new BadRequestException(`Resume with id: ${resumeId} is not exist`);
    }
    if (!existingUser) {
      throw new BadRequestException(`User with email: ${user.email} is not exist`);
    }
    if (existUserProfile) {
      throw new BadRequestException(`User profile with email: ${user.email} is already exist`);
    }

    const newUserProfile = this.UserProfilesModule.create({
      resumeInfo: {
        _id: resumeId,
        url: existResume.file.url
      },
      userInfo: {
        _id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        age: existingUser.age,
        address: existingUser.address
      },
      skills: skills,
      level: level,
      isPublic: isPublic ? isPublic : false,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    })
    return newUserProfile;
  }
}
