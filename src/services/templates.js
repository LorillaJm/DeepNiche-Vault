import axios from 'axios';

class TemplateService {
  constructor() {
    this.templateSources = {
      'Material UI': {
        baseUrl: 'https://cdn.jsdelivr.net/gh/creativetimofficial/material-dashboard@master/assets/img/screenshots',
        templates: {
          Dashboard: [
            {
              name: 'Material Dashboard Pro',
              image: 'https://raw.githubusercontent.com/creativetimofficial/material-dashboard/master/assets/img/dashboard-1.jpg',
              downloadUrl: 'https://www.creative-tim.com/product/material-dashboard-pro',
              downloads: 45600,
              price: 79,
              isPro: true
            },
            {
              name: 'Material Dashboard Free',
              image: 'https://raw.githubusercontent.com/creativetimofficial/material-dashboard/master/assets/img/dashboard-2.jpg',
              downloadUrl: 'https://www.creative-tim.com/product/material-dashboard',
              downloads: 89200,
              price: 0,
              isPro: false
            },
            {
              name: 'Material Admin Enterprise',
              image: 'https://s3.amazonaws.com/creativetim_bucket/products/50/original/material-dashboard-pro-react.jpg',
              downloadUrl: 'https://www.creative-tim.com/product/material-dashboard-enterprise',
              downloads: 23400,
              price: 599,
              isPro: true,
              isEnterprise: true
            }
          ],
          Landing: [
            {
              name: 'Material Kit Pro',
              image: 'https://s3.amazonaws.com/creativetim_bucket/products/89/original/material-kit-pro-react.jpg',
              downloadUrl: 'https://www.creative-tim.com/product/material-kit-pro',
              downloads: 34500,
              price: 89,
              isPro: true
            },
            {
              name: 'Material Kit Free',
              image: 'https://s3.amazonaws.com/creativetim_bucket/products/83/original/material-kit-react.jpg',
              downloadUrl: 'https://www.creative-tim.com/product/material-kit',
              downloads: 67800,
              price: 0,
              isPro: false
            }
          ]
        }
      },
      'Bootstrap': {
        baseUrl: 'https://startbootstrap.com/assets/img/screenshots',
        templates: {
          Dashboard: [
            {
              name: 'SB Admin Pro',
              image: 'https://assets.startbootstrap.com/img/screenshots/premium/sb-admin-pro.jpg',
              downloadUrl: 'https://startbootstrap.com/theme/sb-admin-pro',
              downloads: 89100,
              price: 59,
              isPro: true
            },
            {
              name: 'SB Admin Free',
              image: 'https://assets.startbootstrap.com/img/screenshots/templates/sb-admin.jpg',
              downloadUrl: 'https://startbootstrap.com/template/sb-admin',
              downloads: 156700,
              price: 0,
              isPro: false
            }
          ],
          Landing: [
            {
              name: 'Creative Pro',
              image: 'https://assets.startbootstrap.com/img/screenshots/themes/creative.jpg',
              downloadUrl: 'https://startbootstrap.com/theme/creative-pro',
              downloads: 56700,
              price: 49,
              isPro: true
            },
            {
              name: 'Creative Free',
              image: 'https://assets.startbootstrap.com/img/screenshots/themes/creative.jpg',
              downloadUrl: 'https://startbootstrap.com/theme/creative',
              downloads: 98400,
              price: 0,
              isPro: false
            }
          ]
        }
      },
      'Tailwind': {
        baseUrl: 'https://tailwindui.com/img/templates',
        templates: {
          Dashboard: [
            {
              name: 'Tailwind Dashboard Pro',
              image: 'https://tailwindui.com/img/templates/dashboard-pro.jpg',
              downloadUrl: 'https://tailwindui.com/templates/dashboard-pro',
              downloads: 34500,
              price: 149,
              isPro: true
            },
            {
              name: 'Flowbite Dashboard',
              image: 'https://flowbite.s3.amazonaws.com/templates/flowbite-admin-dashboard/flowbite-admin-dashboard-preview.png',
              downloadUrl: 'https://flowbite.com/docs/components/dashboard/',
              downloads: 78900,
              price: 0,
              isPro: false
            }
          ],
          Landing: [
            {
              name: 'Tailwind Marketing Pro',
              image: 'https://tailwindui.com/img/templates/marketing-pro.jpg',
              downloadUrl: 'https://tailwindui.com/templates/marketing-pro',
              downloads: 23400,
              price: 149,
              isPro: true
            },
            {
              name: 'Flowbite Landing',
              image: 'https://flowbite.s3.amazonaws.com/templates/flowbite-landing-page/flowbite-landing-page-preview.png',
              downloadUrl: 'https://flowbite.com/docs/components/landing-page/',
              downloads: 45600,
              price: 0,
              isPro: false
            }
          ]
        }
      },
      'ThemeForest': {
        baseUrl: 'https://themeforest.net',
        templates: {
          Dashboard: [
            {
              name: 'Metronic - Ultimate Admin',
              image: 'https://preview.keenthemes.com/metronic8/demo1/assets/media/preview/demos/demo1.png',
              downloadUrl: 'https://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469',
              downloads: 123400,
              price: 39,
              isPro: true,
              features: ['RTL Support', 'Dark Mode', 'Multiple Layouts']
            },
            {
              name: 'Cuba - Premium Admin',
              image: 'https://pixelstrap.com/cuba/assets/images/landing/layout-images/dubai.jpg',
              downloadUrl: 'https://themeforest.net/item/cuba-bootstrap-responsive-admin-dashboard-template/27530933',
              downloads: 89700,
              price: 24,
              isPro: true
            }
          ],
          Landing: [
            {
              name: 'Sassio - SaaS Landing Pro',
              image: 'https://themexriver.com/wp/sassio/wp-content/uploads/2023/01/slider-1.jpg',
              downloadUrl: 'https://themeforest.net/item/sassio-multipurpose-saas-software-landing-page/45535029',
              downloads: 45600,
              price: 17,
              isPro: true
            }
          ]
        }
      },
      'Template Monster': {
        baseUrl: 'https://www.templatemonster.com',
        templates: {
          Dashboard: [
            {
              name: 'Adminto - Admin & Dashboard',
              image: 'https://s.tmimgcdn.com/scr/1200x750/279600/adminto-admin-dashboard-template_279678-original.jpg',
              downloadUrl: 'https://www.templatemonster.com/admin-templates/adminto-admin-dashboard-template-279678.html',
              downloads: 34500,
              price: 29,
              isPro: true
            }
          ],
          Landing: [
            {
              name: 'Digibest - Digital Agency',
              image: 'https://s.tmimgcdn.com/scr/1200x750/279600/digibest-digital-agency-template_279655-original.jpg',
              downloadUrl: 'https://www.templatemonster.com/website-templates/digibest-digital-agency-template-279655.html',
              downloads: 23400,
              price: 19,
              isPro: true
            }
          ]
        }
      },
      'Envato Market': {
        baseUrl: 'https://themeforest.net',
        templates: {
          Dashboard: [
            {
              name: 'Vuexy - Admin Dashboard',
              image: 'https://themewagon.com/wp-content/uploads/2020/10/vuexy.jpg',
              downloadUrl: 'https://1.envato.market/vuexy-admin',
              downloads: 78500,
              price: 49,
              isPro: true,
              features: ['RTL Support', 'Dark Mode', '6 Layouts', 'API Ready']
            },
            {
              name: 'Skote - Admin & Dashboard',
              image: 'https://themewagon.com/wp-content/uploads/2020/10/skote.jpg',
              downloadUrl: 'https://1.envato.market/skote-admin',
              downloads: 65400,
              price: 39,
              isPro: true,
              features: ['Multiple Layouts', 'Auth Pages', 'Advanced Charts']
            }
          ],
          Landing: [
            {
              name: 'Saas Land - Multi-Purpose',
              image: 'https://themewagon.com/wp-content/uploads/2020/10/saasland.jpg',
              downloadUrl: 'https://1.envato.market/saasland',
              downloads: 45600,
              price: 24,
              isPro: true,
              features: ['30+ Demos', 'Shop Pages', 'Portfolio Layouts']
            }
          ]
        }
      },
      'WrapBootstrap': {
        baseUrl: 'https://wrapbootstrap.com',
        templates: {
          Dashboard: [
            {
              name: 'Unify - Admin Dashboard',
              image: 'https://themewagon.com/wp-content/uploads/2020/10/unify.jpg',
              downloadUrl: 'https://wrapbootstrap.com/theme/unify-admin-dashboard',
              downloads: 34200,
              price: 29,
              isPro: true,
              features: ['Responsive Design', 'Multiple Themes', 'Regular Updates']
            }
          ],
          Landing: [
            {
              name: 'StartUp Pro',
              image: 'https://themewagon.com/wp-content/uploads/2020/10/startup.jpg',
              downloadUrl: 'https://wrapbootstrap.com/theme/startup-pro',
              downloads: 28900,
              price: 19,
              isPro: true,
              features: ['Modern Design', 'Bootstrap 5', 'SEO Ready']
            }
          ]
        }
      },
      'UI8': {
        baseUrl: 'https://ui8.net',
        templates: {
          Dashboard: [
            {
              name: 'Horizon UI Dashboard',
              image: 'https://horizon-ui.com/horizon-tailwind-react/static/media/auth.f1f7f00711c148f1537b.png',
              downloadUrl: 'https://ui8.net/horizon-ui',
              downloads: 23400,
              price: 129,
              isPro: true,
              features: ['Figma Files', 'React Components', 'Premium Support']
            }
          ],
          Landing: [
            {
              name: 'SaaS Kit Pro',
              image: 'https://themewagon.com/wp-content/uploads/2020/10/saaskit.jpg',
              downloadUrl: 'https://ui8.net/saas-kit',
              downloads: 19800,
              price: 79,
              isPro: true,
              features: ['Design System', 'React & Figma', 'Documentation']
            }
          ]
        }
      },
      'BootstrapDash': {
        baseUrl: 'https://bootstrapdash.com',
        templates: {
          Dashboard: [
            {
              name: 'Star Admin Pro',
              image: 'https://bootstrapdash.com/wp-content/uploads/2020/10/star-admin.jpg',
              downloadUrl: 'https://bootstrapdash.com/product/star-admin-pro',
              downloads: 45600,
              price: 59,
              isPro: true,
              features: ['Advanced UI', 'Premium Components', 'Priority Support']
            },
            {
              name: 'Purple Admin Pro',
              image: 'https://bootstrapdash.com/wp-content/uploads/2020/10/purple-admin.jpg',
              downloadUrl: 'https://bootstrapdash.com/product/purple-admin-pro',
              downloads: 34500,
              price: 49,
              isPro: true,
              features: ['Dark Mode', 'RTL Support', 'Premium Widgets']
            }
          ]
        }
      },
      'Graygrids': {
        baseUrl: 'https://graygrids.com',
        templates: {
          Landing: [
            {
              name: 'Ayro UI Kit',
              image: 'https://graygrids.com/wp-content/uploads/2020/10/ayro-ui.jpg',
              downloadUrl: 'https://graygrids.com/templates/ayro-ui-kit',
              downloads: 28900,
              price: 39,
              isPro: true,
              features: ['UI Components', 'Tailwind CSS', 'Documentation']
            },
            {
              name: 'Plain - Admin Dashboard',
              image: 'https://graygrids.com/wp-content/uploads/2020/10/plain-admin.jpg',
              downloadUrl: 'https://graygrids.com/templates/plain-admin-dashboard',
              downloads: 23400,
              price: 49,
              isPro: true,
              features: ['Clean Design', 'Bootstrap 5', 'Regular Updates']
            }
          ]
        }
      }
    };

    // Fallback images if main image fails
    this.fallbackImages = {
      Dashboard: 'https://flowbite.s3.amazonaws.com/templates/flowbite-admin-dashboard/flowbite-admin-dashboard-preview.png',
      Landing: 'https://flowbite.s3.amazonaws.com/templates/flowbite-landing-page/flowbite-landing-page-preview.png',
      Blog: 'https://flowbite.s3.amazonaws.com/templates/flowbite-blog-template/flowbite-blog-template-preview.png',
      'E-commerce': 'https://flowbite.s3.amazonaws.com/templates/flowbite-ecommerce-template/flowbite-ecommerce-template-preview.png',
      Portfolio: 'https://flowbite.s3.amazonaws.com/templates/flowbite-portfolio-template/flowbite-portfolio-template-preview.png'
    };
  }

  // Helper method to verify image URL
  async verifyImageUrl(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('Error verifying image URL:', error);
      return false;
    }
  }

  async getAllTemplates() {
    try {
      const templates = [];
      let id = 1;

      for (const [source, sourceData] of Object.entries(this.templateSources)) {
        for (const [category, categoryTemplates] of Object.entries(sourceData.templates)) {
          for (const template of categoryTemplates) {
            // Verify image URL and use fallback if needed
            const imageUrl = await this.verifyImageUrl(template.image) 
              ? template.image 
              : this.fallbackImages[category];

            templates.push({
              id: `template-${id++}`,
              name: template.name,
              description: `Professional ${template.name.toLowerCase()} template with modern design and full functionality.`,
              thumbnailUrl: imageUrl,
              category,
              type: source === 'Material UI' ? 'React' : source,
              rating: (4 + Math.random()).toFixed(1),
              downloads: template.downloads,
              sourceUrl: template.downloadUrl,
              downloadUrl: template.downloadUrl,
              source,
              price: template.price,
              isPro: template.isPro,
              isEnterprise: template.isEnterprise || false,
              features: [
                'Responsive Design',
                'Modern UI',
                'Easy Customization',
                'Well Documented',
                template.isPro ? 'Premium Support' : 'Community Support',
                template.isPro ? 'Regular Updates' : 'Basic Updates',
                ...(template.features || [])
              ],
              lastUpdated: new Date().toISOString()
            });
          }
        }
      }

      return templates;
    } catch (error) {
      console.error('Error generating templates:', error);
      throw error;
    }
  }

  async getTemplatesByCategory(category) {
    const allTemplates = await this.getAllTemplates();
    return category === 'All' 
      ? allTemplates 
      : allTemplates.filter(template => template.category === category);
  }

  async getTemplatesByType(type) {
    const allTemplates = await this.getAllTemplates();
    return type === 'All'
      ? allTemplates
      : allTemplates.filter(template => template.type === type);
  }

  async searchTemplates(query) {
    const allTemplates = await this.getAllTemplates();
    const searchTerm = query.toLowerCase();
    return allTemplates.filter(template => 
      template.name.toLowerCase().includes(searchTerm) ||
      template.description.toLowerCase().includes(searchTerm) ||
      template.category.toLowerCase().includes(searchTerm) ||
      template.type.toLowerCase().includes(searchTerm) ||
      template.source.toLowerCase().includes(searchTerm)
    );
  }
}

export const templateService = new TemplateService(); 