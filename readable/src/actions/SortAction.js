export const LATEST = 'LATEST';
export const POPULAR = 'POPULAR';

export const sortPopular = () => {
  return {
    type: POPULAR
  };
};

export const sortLatest = () => {
  return {
    type: LATEST
  };
};