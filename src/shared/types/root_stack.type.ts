import { NavigatorScreenParams } from '@react-navigation/native';
import { IObject } from './object';
import { Contractor } from '@/screens/ObjectStackScreens/ObjectContractorScreen/ObjectContractorScreen';
import { LlmResult } from '@/screens/ObjectStackScreens/ObjectControlEntryScreen/ObjectControlEntryScreen';
import { ICurrentVerification } from '@/features/auth/model/auth-slice';

export type RootStackParamList = {
  login: undefined;
  register: undefined;
  main: undefined;
  Verifiacation: NavigatorScreenParams<VerificationStackParamList>;
  profileStack: { screen: keyof ProfileStackParamList };
  ChatStack: NavigatorScreenParams<ChatStackParamList>;
  ObjectStack: NavigatorScreenParams<ObjectStackParamList>;
  authStack: { screen: keyof authStackParamList };
  tab1: { screen: keyof Tab1StackParamList };
  tab2: { screen: keyof Tab2StackParamList };
  tab3: { screen: keyof Tab3StackParamList };
};

export type authStackParamList = {
  Auth: undefined;
  Register: undefined;
  Verification: undefined;
};

export type VerificationStackParamList = {
  VerificationMain: {
    
  } | undefined;
  VerificationHistory: {
    object?: IObject;
  } | undefined;
  VerificationChooseObject: undefined;
  VerificationScan: {
    object?: IObject;
  };
  VerificationNfcListScreen: {
    object: ICurrentVerification
  }
};

export type ChatStackParamList = {
  main: undefined;
  ChatChooseObject: undefined;
  ChatAvailableObject: {
    title?: string;
  };
  ChatTalks: undefined;
};

export type ObjectStackParamList = {
  Object: undefined;
  ObjectChooseObject: undefined;
  ObjectAvailableObject: {
    object?: IObject;
  };
  ObjectTalks: {
    title?: string;
    header: string;
  };
  ObjectComments: {
    title?: string;
    header: string;
  };
  ObjectCommentOpen: {
    title?: string;
    date?: string;
    status?: string;
    header: string;
    comment_id: string
  };
  ObjectWork: {
    title?: string;
  };
  ObjectWorkOpen: {
    title?: string;
  };
  ObjectWorkSchedule: {
    title?: string;
  };
  ObjectWorkVerification: {
    title?: string;
  };
  ObjectContractor: {
    object?: IObject
  };
  ObjectActivation: {
    object?: IObject;
    contractor?: Contractor;
  };
  ObjectVerificationOpen: {
    title: string;
    subtitle: string;
    endDate: string;
    startDate: string;
    status: 'fixed' | 'check' | 'active' | '';
  };
  
  ObjectSendWork: {
    title: string;
    subtitle: string;
    text: string;
    link: string;
  };
  ObjectControlOpen: {
    form: LlmResult,
  },
  ObjectControl: {
    object?: IObject,
  },
  ObjectControlForm: {
    form: LlmResult | null,
    mainTask: {
      title: string,
      startDate: string,
      endDate: string,
    },
    categoryId: string,
    object: IObject | null
  },
  ObjectControlEntry: {
    object: IObject | null,
    mainTask: {
      title: string,
      startDate: string,
      endDate: string,
    },
    secondaryTask: {
      id: string,
      title: string,
      startDate: string,
      endDate: string
    },
  },
  ObjectGeoTags: {
    object: IObject
  }
};

export type ProfileStackParamList = {
  profileMain: undefined;
};

export type Tab1StackParamList = {
  tab1_main: undefined;
};

export type Tab2StackParamList = {
  tab2_main: undefined;
};

export type Tab3StackParamList = {
  tab3_main: undefined;
};
