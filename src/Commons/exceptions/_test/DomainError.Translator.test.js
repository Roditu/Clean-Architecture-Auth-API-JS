const DomainErrorTranslator = require('../DomainErrorTranslator');
const InvariantError = require('../InvariantError');

describe('DomainErrorTranslator', () => {
  it('should translate error correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'));
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'));
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_LIMIT_CHAR')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'));
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'));
    expect(DomainErrorTranslator.translate(new Error('LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat login karena properti yang dibutuhkan tidak ada'));
    expect(DomainErrorTranslator.translate(new Error('LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('tidak dapat login karena tipe data tidak sesuai'));
    expect(DomainErrorTranslator.translate(new Error('AUTH_USER.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat melakukan autentikasi karena properti token tidak terpenuhi'));
    expect(DomainErrorTranslator.translate(new Error('AUTH_USER.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .toStrictEqual(new InvariantError('tidak dapat melakukan autentikasi karena tipe data token tidak sesuai'));
  });

  it('should return original error when error message is not needed to translate', () => {
    const error = new Error('some_error_message');

    const translatedError = DomainErrorTranslator.translate(error);

    expect(translatedError).toStrictEqual(error);
  });
});
