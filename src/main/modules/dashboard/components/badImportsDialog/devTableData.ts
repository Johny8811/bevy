import { CreateBatchTasksErrors } from '../../../../types/tasks';

export const EXAMPLE_IMPORT_ERRORS: CreateBatchTasksErrors[] = [
  {
    error: {
      statusCode: 400,
      error: 1010,
      message: 'Invalid phone number',
      cause: null
    },
    task: {
      destination: {
        address: {
          number: '22',
          street: 'Vele',
          city: 'Přezletice',
          postalCode: '25073',
          country: 'Czech Republic'
        }
      },
      recipients: [
        {
          name: 'Skočil 1ks',
          phone: '',
          skipSMSNotifications: true
        }
      ],
      completeAfter: 1687143600000,
      completeBefore: 1687156200000,
      quantity: 1,
      metadata: [
        {
          name: 'User ID',
          type: 'string',
          visibility: ['api'],
          value: 'AcBKj7mq58gO3pOlM6AYXUah0yS2'
        }
      ]
    }
  },
  {
    error: {
      statusCode: 400,
      error: 1010,
      message: 'Invalid phone number',
      cause: null
    },
    task: {
      destination: {
        address: {
          number: '144',
          street: 'Náměstí',
          city: 'Praha',
          postalCode: '19017',
          country: 'Czech Republic'
        }
      },
      recipients: [
        {
          name: 'Martin Artin 1ks',
          phone: '',
          skipSMSNotifications: true
        }
      ],
      completeAfter: 1687143600000,
      completeBefore: 1687156200000,
      quantity: 1,
      metadata: [
        {
          name: 'User ID',
          type: 'string',
          visibility: ['api'],
          value: 'AcBKj7mq58gO3pOlM6AYXUah0yS2'
        }
      ]
    }
  },
  {
    error: {
      statusCode: 400,
      error: 1010,
      message: 'Invalid phone number',
      cause: null
    },
    task: {
      destination: {
        address: {
          number: '1111/3',
          street: 'Babička',
          city: 'Praha',
          postalCode: '14900',
          country: 'Czech Republic'
        }
      },
      recipients: [
        {
          name: 'Jakub Jakub 1ks',
          phone: '',
          skipSMSNotifications: true
        }
      ],
      completeAfter: 1687143600000,
      completeBefore: 1687156200000,
      quantity: 1,
      metadata: [
        {
          name: 'User ID',
          type: 'string',
          visibility: ['api'],
          value: 'AcBKj7mq58gO3pOlM6AYXUah0yS2'
        }
      ]
    }
  },
  {
    error: {
      statusCode: 400,
      error: 1010,
      message: 'Invalid phone number',
      cause: null
    },
    task: {
      destination: {
        address: {
          number: '1801',
          street: 'U lesa',
          city: 'Praha',
          postalCode: '12899',
          country: 'Czech Republic'
        }
      },
      recipients: [
        {
          name: 'Jan Ban 1ks',
          phone: '',
          notes: 'Pivovar',
          skipSMSNotifications: true
        }
      ],
      completeAfter: 1687143600000,
      completeBefore: 1687156200000,
      quantity: 1,
      metadata: [
        {
          name: 'User ID',
          type: 'string',
          visibility: ['api'],
          value: 'AcBKj7mq58gO3pOlM6AYXUah0yS2'
        }
      ]
    }
  },
  {
    error: {
      statusCode: 400,
      error: 1010,
      message: 'Invalid phone number',
      cause: null
    },
    task: {
      destination: {
        address: {
          number: '1999/12',
          street: 'Novopačená',
          city: 'Praha',
          postalCode: '24211',
          country: 'Czech Republic'
        }
      },
      recipients: [
        {
          name: 'Stena Jandovná 1ks',
          phone: '555444555',
          notes: 'Odběrné místo GYM - vchod hned vedle restaurace GymBim. Doručovat ihned.',
          skipSMSNotifications: true
        }
      ],
      completeAfter: 1687143600000,
      completeBefore: 1687150800000,
      quantity: 1,
      metadata: [
        {
          name: 'User ID',
          type: 'string',
          visibility: ['api'],
          value: 'AcBKj7mq58gO3pOlM6AYXUah0yS2'
        }
      ]
    }
  },
  {
    error: {
      statusCode: 400,
      error: 1010,
      message: 'Invalid phone number',
      cause: null
    },
    task: {
      destination: {
        address: {
          number: '4462/22',
          street: 'Vodovodna',
          city: 'Praha',
          postalCode: '11100',
          country: 'Czech Republic'
        }
      },
      recipients: [
        {
          name: 'Jakub Nakup 1ks',
          phone: '421777777778',
          notes: 'Odběrné místo Maštal - vchod hned vedle Kravína. Doručovat v noci.',
          skipSMSNotifications: true
        }
      ],
      completeAfter: 1687143600000,
      completeBefore: 1687150800000,
      quantity: 1,
      metadata: [
        {
          name: 'User ID',
          type: 'string',
          visibility: ['api'],
          value: 'AcBKj7mq58gO3pOlM6AYXUah0yS2'
        }
      ]
    }
  }
];
