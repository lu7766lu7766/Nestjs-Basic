import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Test_1000 } from 'src/constants/api-code/test-1000';

export class TestPostDto {
  @MaxLength(20, { message: Test_1000.TITLE_ERROR.toString() })
  @IsString({ message: Test_1000.TITLE_ERROR.toString() })
  @IsNotEmpty({ message: Test_1000.TITLE_ERROR.toString() })
  public readonly title: string;

  @IsString({ message: Test_1000.DESCRIPTION_ERROR.toString() })
  @IsOptional({ message: Test_1000.DESCRIPTION_ERROR.toString() })
  public readonly description?: string;
}
