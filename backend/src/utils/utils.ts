import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            reject(err);
          }
    
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              reject(err);
            }
    
            resolve(hash);
          });
        });
    });
}
  
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
          if (err) {
            reject(err);
          }
          resolve(isMatch);
        });
    });
};