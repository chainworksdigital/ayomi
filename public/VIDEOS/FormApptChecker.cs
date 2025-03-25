using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.IO;
using System.Net;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace ApptChecker
{
	public partial class FormApptChecker : Form
	{
		// Logger Configurations
		public static readonly log4net.ILog apptCheckerLog =
			log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

		bool minimizeMode = false;

		#region private variables
		private string defaultOffice;
		private string defaultSpecialty;
		private string lastUpdatedDateTime;
		private DataTable appointmentData;
		private Panel appointmentDataGridPanel;

		private List<string> specialtyList = new List<string>();
		private Dictionary<string, Office> officeDetails = new Dictionary<string, Office>();

		// Form Control box buttons
		private Rectangle closeButtonBounds;
		private Rectangle collapseButtonBounds;
		private Rectangle logoBounds;
		#endregion

		/// <summary>
		/// Constructor of FormApptChecker.
		/// </summary>
		public FormApptChecker()
		{
			InitializeComponent();
			this.FormBorderStyle = FormBorderStyle.None;
			Helper.Helper.ValidateConfigurations();
			officeDetails = Helper.Helper.GetOfficeList();
			specialtyList = Helper.Helper.GetSpecialties();
		}

		protected override void OnPaint(PaintEventArgs e)
		{
			base.OnPaint(e);

			Graphics g = e.Graphics;

			// Determine title bar background color based on window focus
			Color titleBarColor = SystemColors.Control;

			// Title bar height
			int titleBarHeight = 30;

			// Title bar background
			using (Brush titleBarBrush = new SolidBrush(titleBarColor))
			{
				g.FillRectangle(titleBarBrush, 0, 0, this.Width, titleBarHeight);
			}

			// Draw the title text

			if(minimizeMode == false)
			{
				using (Font titleFont = new Font("Microsoft Sans Serif", 10))
				{
					g.DrawString(this.Text, titleFont, Brushes.Black, new Point(30, 7));
				}
			}
			else
			{
				using (Font titleFont = new Font("Microsoft Sans Serif", 10))
				{
					g.DrawString("", titleFont, Brushes.Black, new Point(30, 7));
				}
			}
			

			// Logo
			logoBounds = new Rectangle(5, 5, 20, 20); // Adjust logo size and position
			if (Properties.Resources.rodeologo != null) // Replace 'LogoName' with your actual resource name
			{
				g.DrawImage(Properties.Resources.rodeologo, logoBounds);
			}

			// Draw the Collpse button
			collapseButtonBounds = new Rectangle(this.Width - 60, 8, 13, 13);

			if(minimizeMode == false)
			{
				Point[] trianglePoints = {
					new Point(collapseButtonBounds.Left, collapseButtonBounds.Top + collapseButtonBounds.Height / 2), // Left middle
				new Point(collapseButtonBounds.Right, collapseButtonBounds.Top),                            // Top right
				new Point(collapseButtonBounds.Right, collapseButtonBounds.Bottom) };

				using (Brush backButtonBrush = new SolidBrush(Color.Black))
				{
					g.FillPolygon(backButtonBrush, trianglePoints);
				}
			}
			else
			{
				Point[] trianglePoints = {
					new Point(collapseButtonBounds.Left, collapseButtonBounds.Top),
				new Point(collapseButtonBounds.Left, collapseButtonBounds.Bottom),
				new Point(collapseButtonBounds.Right, collapseButtonBounds.Top + collapseButtonBounds.Height / 2),
				};

				using (Brush backButtonBrush = new SolidBrush(Color.Black))
				{
					g.FillPolygon(backButtonBrush, trianglePoints);
				}
			}

			// Draw the close button
			closeButtonBounds = new Rectangle(this.Width - 40, 5, 40, 25);
			//g.FillRectangle(Brushes.Red, closeButtonBounds);
			g.DrawString("X", this.Font, Brushes.Black, closeButtonBounds.Left + 10, closeButtonBounds.Top + 3);
			

		}

		private const int WM_NCLBUTTONDOWN = 0xA1;
		private const int HTCAPTION = 0x2;

		[DllImport("user32.dll")]
		private static extern int SendMessage(IntPtr hWnd, int Msg, int wParam, int lParam);

		[DllImport("user32.dll")]
		private static extern bool ReleaseCapture();

		protected override void OnMouseDown(MouseEventArgs e)
		{
			base.OnMouseDown(e);

			// Allow dragging the form by clicking on the custom title bar
			if (e.Button == MouseButtons.Left && e.Y < 30) // Assuming title bar height is 30
			{
				ReleaseCapture();
				SendMessage(Handle, WM_NCLBUTTONDOWN, HTCAPTION, 0);
			}

			if(collapseButtonBounds.Contains(e.Location))
			{
				if(minimizeMode == false)
				{
					this.Size = new Size(this.Width * 2, this.Height);
					comboBoxOffice.Size = new Size((int)(comboBoxOffice.Width * 0.8), comboBoxOffice.Height);
					specialtyTabControl.Size = new Size(specialtyTabControl.Width/2, specialtyTabControl.Height);
					textBox1.Size = new Size(textBox1.Width/2, textBox1.Height);
					panel1.Size = new Size(panel1.Width/2, panel1.Height);
					searchBox.Size = new Size((int)(searchBox.Width * 0.8), searchBox.Height);
					lblOfficeName.Size = new Size(this.Width - button1.Width, lblOfficeName.Height);
					comboBoxOffice.Location = new System.Drawing.Point(this.Width - comboBoxOffice.Width-8, comboBoxOffice.Location.Y);
					searchBox.Location = new System.Drawing.Point(this.Width - searchBox.Width - 8, searchBox.Location.Y);
					textBox1.Font = new Font("Microsoft Sans Serif", 6.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
					minimizeMode = true;
				}
				else
				{
					this.Size = new Size(this.Width*2, this.Height);
					panel1.Size = new Size(panel1.Width*2, panel1.Height);
					comboBoxOffice.Size = new Size((int)(comboBoxOffice.Width / 0.8), comboBoxOffice.Height);
					comboBoxOffice.Location = new System.Drawing.Point(this.Width - comboBoxOffice.Width-8, comboBoxOffice.Location.Y);
					specialtyTabControl.Size = new Size(specialtyTabControl.Width*2, specialtyTabControl.Height);
					textBox1.Size = new Size(textBox1.Width*2, textBox1.Height);
					textBox1.Font = new Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
					lblOfficeName.Size = new Size(this.Width-button1.Width, lblOfficeName.Height);
					searchBox.Size = new Size((int)(searchBox.Width / 0.8), searchBox.Height);
					searchBox.Location = new System.Drawing.Point(this.Width - searchBox.Width-8, searchBox.Location.Y);
					minimizeMode = false;
				}
				this.Invalidate(true);
			}

			if (closeButtonBounds.Contains(e.Location))
			{
				this.Close();
			}

		}
		
		/// <summary>
		/// Form Load Actions.
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e"></param>
		private void FormApptChecker_Load(object sender, EventArgs e)
		{
			InitializeOffices();
			// Set Default office
			SetDefaultOffice();
			InitializeSpecialities();
		}

		/// <summary>
		/// Sets Default Office.
		/// </summary>
		private void SetDefaultOffice()
		{
			try
			{
				apptCheckerLog.Info("Setting Default Office.");
				this.defaultOffice = ConfigurationManager.AppSettings["DefaultOffice"];
				apptCheckerLog.Info("Default Office is " + this.defaultOffice);
				Boolean isOfficeSet = false;
				if (this.defaultOffice != "")
				{
					foreach (var item in comboBoxOffice.Items)
					{
						// Cast the item to ComboBoxItem
						if (item is ComboBoxItem comboBoxItem && comboBoxItem.Text.ToLower() == this.defaultOffice.ToLower())
						{
							comboBoxOffice.SelectedItem = comboBoxItem;
							apptCheckerLog.Info("Set default office successfully.");
							isOfficeSet = true;
							return;
						}
					}

					if(false == isOfficeSet)
					{
						throw new Exception("Default office is not in the central configured office list.");
					}
				}
				else
				{
					// Do Nothing
				}
			}
			catch(Exception ex)
			{
				MessageBox.Show(ex.Message + "\nPlease Check log file for more details.");
				apptCheckerLog.Error(ex.Message + Environment.NewLine + ex.StackTrace);
				Environment.Exit(1);
			}
		}

		/// <summary>
		/// Creates Dr. Specialty tabs dynamically.
		/// </summary>
		private void InitializeSpecialities()
		{
			try
			{
				apptCheckerLog.Info("Creating Dr. Specialities tab controls.");
				foreach (string speciality in this.specialtyList)
				{
					TabPage dr_speciality = new TabPage(speciality);
					dr_speciality.Name = "tabPage_" + speciality;
					specialtyTabControl.TabPages.Add(dr_speciality);
				}
				apptCheckerLog.Info("Setting " + this.defaultSpecialty + " as Default Dr. Specialty.");
				specialtyTabControl.SelectedTab = specialtyTabControl.TabPages["tabPage_" + ConfigurationManager.AppSettings["DefaultSpecialty"].ToUpper()];
				specialtyTabControl_Selected(specialtyTabControl, null);
			}
			catch(Exception ex)
			{
				apptCheckerLog.Error("Exception occurred while initializing Dr.Specialities.");
				apptCheckerLog.Error(ex.Message + Environment.NewLine + ex.StackTrace); 
				MessageBox.Show("Error while initializing Dr. Specialties. \nPlease Check log file for more details.");
				Environment.Exit(1);
			}
		}

		/// <summary>
		/// Creates Offices DropDown
		/// </summary>
		private void InitializeOffices()
		{
			try
			{
				apptCheckerLog.Info("Adding Offices to Office DropDown List.");
				foreach (var office in this.officeDetails)
				{
					// Set values to combobox
					comboBoxOffice.Items.Add(new ComboBoxItem(office.Key, office.Value.officeColor, office.Value.officeTextColor));
					comboBoxOffice.Refresh();
				}
			}
			catch(Exception ex)
			{
				MessageBox.Show("Error while initializing Offices. \nPlease Check log file for more details.");
				apptCheckerLog.Error("Exception occurred while initializing Offices.");
				apptCheckerLog.Error(ex.Message + Environment.NewLine + ex.StackTrace);
				Environment.Exit(1);
			}
		}

		/// <summary>
		/// Rodeo Logo Control Actions.
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e"></param>
		private void Logo_Click(object sender, EventArgs e)
		{
			if (this.TopMost == true)
			{
				apptCheckerLog.Info("Disabling Form to be TopMost.");
				this.TopMost = false;
			}
			else
			{
				apptCheckerLog.Info("Enabling Form to be TopMost.");
				this.TopMost = true;
			}
		}

		/// <summary>
		/// Converts API response into DataTable format.
		/// </summary>
		/// <returns></returns>
		public static DataTable ConvertCSVtoDataTable()
		{
			try
			{
				apptCheckerLog.Info("Accessing Data Access URL to get the appointments data.");
				DataTable dt = new DataTable();

				HttpWebRequest request = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DataAccessURL"]);
				request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

				apptCheckerLog.Info("Converting CSV/Text data into DataTable format.");
				using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
				using (Stream stream = response.GetResponseStream())
				using (StreamReader sr = new StreamReader(stream))
				{
					string[] headers = sr.ReadLine().Split(';');
					foreach (string header in headers)
					{
						dt.Columns.Add(header.Replace("\"", ""));
					}
					while (!sr.EndOfStream)
					{
						string[] rows = sr.ReadLine().Split(';');
						DataRow dr = dt.NewRow();
						for (int i = 0; i < headers.Length; i++)
						{
							dr[i] = rows[i].Replace("\"", "");
						}
						dt.Rows.Add(dr);
					}
				}
				return dt;
			}
			catch(Exception ex)
			{
				MessageBox.Show("Error occurred while parsing appointment data.");
				apptCheckerLog.Error("Exception occurred while converting CSV data into DataTable format.");
				apptCheckerLog.Error(ex.Message + Environment.NewLine + ex.StackTrace);
				throw new Exception("Error occurred while parsing CSV.");
			}
		}

		/// <summary>
		/// Specialty tab selected event handler.
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e"></param>
		private void specialtyTabControl_Selected(object sender, TabControlEventArgs e)
		{
			searchBox.Visible = false;
			this.defaultSpecialty = (sender as TabControl).SelectedTab.Text;
			this.displayFilteredDataInGrid(sender, this.defaultOffice, this.defaultSpecialty);
		}

		/// <summary>
		/// Filter appointment data by office and specialty.
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="office"></param>
		/// <param name="specialty"></param>
		private void displayFilteredDataInGrid(object sender, string office, string specialty)
		{
			try
			{
				DataTable appointmentDataTable = this.appointmentData.Copy();
				// Filter data by office and specialty
				appointmentDataTable.DefaultView.RowFilter = $"office = '{office}' AND specialty = '{specialty}'";
				appointmentDataTable = appointmentDataTable.DefaultView.ToTable();
				// Remove unnecessary columns
				appointmentDataTable.Columns.Remove("last_updated");
				appointmentDataTable.Columns.Remove("office");
				appointmentDataTable.Columns.Remove("specialty");
				appointmentDataTable.Columns.Remove("sched_date");

				appointmentDataTable.Columns["display_date"].ColumnName = "Date";
				appointmentDataTable.Columns["display_day"].ColumnName = "Day";
				appointmentDataTable.Columns["appts"].ColumnName = "Appts";
				appointmentDataTable.Columns["providers"].ColumnName = "Dr";

				// Tally-Up Logic Only for GEN Specialty
				if (specialty == "GEN")
				{
					foreach (DataRow row in appointmentDataTable.Rows)
					{
						// Column is left blank if appointment count is 0.
						if (row["Appts"].ToString() == "0")
						{
							row["Appts"] = "";
						}
						// Split multiple doctors
						string[] doctors = row["Dr"].ToString().Split(',');  
						for (int i = 0; i < doctors.Length; i++)
						{
							string[] nameParts = doctors[i].Trim().Split(' '); 
							string lastName = nameParts[nameParts.Length - 1]; 
							doctors[i] = lastName.Substring(0, Math.Min(5, lastName.Length)); 
						}
						// Join names back
						row["Dr"] = string.Join(", ", doctors); 

					}

				}

				// Step 3: Configure DataGridView
				this.appointmentDataGridPanel = new Panel()
				{
					Dock = DockStyle.Fill,
					BorderStyle = BorderStyle.None,
					Size = specialtyTabControl.TabPages[(sender as TabControl).SelectedIndex].Size
				};

				if (specialtyTabControl.TabPages[(sender as TabControl).SelectedIndex].Controls.Count > 0)
				{
					specialtyTabControl.TabPages[(sender as TabControl).SelectedIndex].Controls.Clear();
					specialtyTabControl.TabPages[(sender as TabControl).SelectedIndex].Controls.Add(this.appointmentDataGridPanel);
				}
				else
				{
					specialtyTabControl.TabPages[(sender as TabControl).SelectedIndex].Controls.Add(this.appointmentDataGridPanel);
				}

				// Step 4: Setup DataGridView Properties
				DataGridView dv = new DataGridView()
				{
					Dock = DockStyle.Fill,
					AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.None,
					ReadOnly = true,
					AllowUserToAddRows = false,
					BackgroundColor = Color.White,
					EnableHeadersVisualStyles = false,
					Font = new Font("Microsoft Sans Serif", 8.25F, FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0))),
					ColumnHeadersDefaultCellStyle = new DataGridViewCellStyle
					{
						Font = new Font("Microsoft Sans Serif", 9.25F, FontStyle.Bold, GraphicsUnit.Point),
						BackColor = Color.LightGray, // Optional: Set a background color
						Alignment = DataGridViewContentAlignment.MiddleCenter
					},
					AllowUserToResizeRows = false,
					AllowUserToResizeColumns = false,
					ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing,
					ColumnHeadersHeight = 30,
					RowHeadersWidth = 30,
				};

				// Step 5: Adjust Column Display Settings
				dv.DataBindingComplete += (s, e) =>
				{
					
					foreach (DataGridViewColumn column in dv.Columns)
					{
						// Disable sorting on columns
						column.SortMode = DataGridViewColumnSortMode.NotSortable;

						// increased "Dr" column width for GEN.
						if(specialty == "GEN" && column.Name == "Dr") 
						{ 
								column.Width = 120; 
						}
                        else
                        {
							column.Width = 56;
						}

						// Change Alignment for Appts column
						if (column.Name != "Dr")
						{
							column.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
						}
					}
				};

				dv.SuspendLayout();
				dv.DataSource = appointmentDataTable.DefaultView;
				dv.ResumeLayout();

				// Add Data Grid to the Panel
				this.appointmentDataGridPanel.Controls.Add(dv);
			}
			catch (Exception ex)
			{
				apptCheckerLog.Error("Exception while filtering appointments data by selected Office and Dr.Specialty");
				apptCheckerLog.Error(ex.Message + Environment.NewLine + ex.StackTrace);
				MessageBox.Show("Error while filtering appointments data. \nPlease Check log file for more details.");
				Environment.Exit(1);
			}
		}

		/// <summary>
		/// DrawItem event of Office Dropdown.
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e"></param>
		private void comboBoxOffice_DrawItem(object sender, DrawItemEventArgs e)
		{
			try
			{
				if (e.Index < 0) return;
				// Get the graphics context
				Graphics g = e.Graphics;

				// Get the ComboBox
				ComboBox comboBox = sender as ComboBox;
				// Cast the item to ComboBoxItem
				if (comboBox == null)
				{
					apptCheckerLog.Error("ComboBox is null in DrawItem.");
					return;
				}
				if (comboBox.Items.Count == 0)
				{
					apptCheckerLog.Error("ComboBox has no items in DrawItem.");
					return;
				}
				if(e.Index < 0)
                {
					apptCheckerLog.Error("ComboBox has index<0 in DrawItem.");
				}
				if (e.Index >= comboBox.Items.Count)
				{
					apptCheckerLog.Error($"Invalid index: {e.Index}");
					return;
				}
				int itemCount = comboBox.Items.Count;
				if (itemCount == 0)
				{
					apptCheckerLog.Error("ComboBox has no items at the time of drawing.");
					return;
				}
				apptCheckerLog.Info($"Drawing item at index: {e.Index}");

				ComboBoxItem item = (ComboBoxItem)((ComboBox)sender).Items[e.Index];
				if (item == null)
				{
					apptCheckerLog.Error($"Item at index {e.Index} is null or invalid.");
					return;
				}
				string officeText = item.Text; // DropDown Item text
				Color backgroundColor = ColorTranslator.FromHtml(item.BackgroundColor);
				Color textColor = ColorTranslator.FromHtml(item.TextColor);

				// Fill the background 
				using (Brush backgroundBrush = new SolidBrush(backgroundColor))
				{
					g.FillRectangle(backgroundBrush, e.Bounds);
				}

				// Create a StringFormat object to align the text
				StringFormat stringFormat = new StringFormat
				{
					LineAlignment = StringAlignment.Center, // Align text vertically to the center
					Alignment = StringAlignment.Center
				};

				Brush textBrush = new SolidBrush(textColor);
				Font font = new Font(e.Font.FontFamily, 10, FontStyle.Bold);
				e.Graphics.DrawString(officeText, font, textBrush, e.Bounds, stringFormat);

				e.DrawFocusRectangle();
			}
			catch(Exception ex)
			{
				apptCheckerLog.Error("Exception while drawing Office dropdown items.");
				apptCheckerLog.Error(ex.Message + "\n" + ex.StackTrace);
				MessageBox.Show("Error while processing office details.");
				Environment.Exit(1);
			}
		}

		/// <summary>
		/// Selected Index Changed event of Office DropDown.
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e"></param>
		private void comboBoxOffice_SelectedIndexChanged(object sender, EventArgs e)
		{
			try
			{
				if (comboBoxOffice.Items.Count == 0)
				{
					apptCheckerLog.Error("comboBoxOffice has no items. Selection change ignored.");
					return;
				}
				if (comboBoxOffice.SelectedIndex < 0)
				{
					apptCheckerLog.Error("comboBoxOffice.SelectedIndex is -1 or invalid.");
					return;
				}
				if (comboBoxOffice.SelectedItem == null)
				{
					apptCheckerLog.Error("comboBoxOffice.SelectedItem is null.");
					return;
				}
				// Check if an item is selected
				if (comboBoxOffice.SelectedIndex >= 0)
				{
					apptCheckerLog.Error("Index change is not null, not 0, not invalid it is " + comboBoxOffice.SelectedIndex);
					searchBox.Visible = false;
					comboBoxOffice.Visible = false;
					// Get the selected Item color and text color and set to label
					if (comboBoxOffice.SelectedItem is ComboBoxItem selectedItem)
					{
						lblOfficeName.Text = selectedItem.Text;
						lblOfficeName.BackColor = ColorTranslator.FromHtml(selectedItem.BackgroundColor);
						lblOfficeName.ForeColor = ColorTranslator.FromHtml(selectedItem.TextColor);

						apptCheckerLog.Info("Accessing Data Access API to get the CSV file appointments data.");

						//Get CSV file data from API in DataTable format
						this.appointmentData = ConvertCSVtoDataTable();

						apptCheckerLog.Info("Getting DateTime of Last Updated Data on.");
						this.lastUpdatedDateTime = this.appointmentData.Rows[0]["last_updated"].ToString();
						textBox1.Text = "Last Updated : " + this.lastUpdatedDateTime;
						if (this.defaultOffice.ToLower() != lblOfficeName.Text.ToLower())
						{
							this.defaultOffice = lblOfficeName.Text;
							specialtyTabControl.SelectedTab = specialtyTabControl.TabPages["tabPage_" + this.defaultSpecialty];
							specialtyTabControl_Selected(specialtyTabControl, null);
						}
						else
						{
							//Do Nothing
						}
					}
					else
					{
						// Do Nothing
					}
				}
				else
				{
					apptCheckerLog.Error("No valid selection in comboBoxOffice.");
					return;
				}
			}
			catch (Exception ex)
			{
				MessageBox.Show($"Error in SelectedIndexChanged: {ex.Message}\n{ex.StackTrace}",
					"Selected Index Changed Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
				apptCheckerLog.Error("Error in SelectedIndexChanged: " + ex.Message + "\n" + ex.StackTrace);
				Environment.Exit(1);
			}
		}

		/// <summary>
		/// Click event of Office label.
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e"></param>
		private void lblOfficeName_Click(object sender, EventArgs e)
		{
			if (searchBox.Visible == true)
			{
				searchBox.Visible = false;
			}
			else
			{
				searchBox.Visible = true;
				searchBox.Text = "";
				// Open Office dropdown
				comboBoxOffice.DroppedDown = true;
				comboBoxOffice.Cursor = Cursors.Default;
			}
		}

		/// <summary>
		/// DrawItem event of Specialty TabControl.
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e"></param>
		private void specialtyTabControl_DrawItem(object sender, DrawItemEventArgs e)
		{
			try
			{
				TabControl tab = sender as TabControl;
				if (tab == null)
				{
					apptCheckerLog.Error("TabControl is null in DrawItem.");
					return;
				}

				// Check if selected index
				bool isSelected = tab.SelectedIndex == e.Index;

				// Set background color
				Color backgroundColor = isSelected ? Color.LightBlue : Color.LightGray;

				Graphics g = e.Graphics;
				TabPage tabPage = tab.TabPages[e.Index];
				Rectangle rect = tab.GetTabRect(e.Index);
				string text = tabPage.Text;

				// Draw background
				g.FillRectangle(new SolidBrush(backgroundColor), rect);

				// Rotate graphics for vertical text.
				g.TranslateTransform(rect.Left + rect.Width / 2, rect.Top + rect.Height / 2);
				g.RotateTransform(-90);
				g.TranslateTransform(-rect.Height / 2, -rect.Width / 2);

				int topSpace = 6;
				int leftSpace = 4;
				// Draw text horizontally at the center of the tab
				using (Font font = new Font("Arial", 8, FontStyle.Bold))
				{
					SizeF textSize = g.MeasureString(text, font);
					float x = (rect.Height - textSize.Width) / 2 - topSpace;  // Adjust for vertical centering
					float y = (rect.Width - textSize.Height) / 2 + leftSpace; // Adjust for horizontal centering
					g.DrawString(string.Join(" ", text.ToCharArray()), font, Brushes.Black, x, y);
				}
				g.ResetTransform();
				e.DrawFocusRectangle();
			}
			catch (Exception ex)
			{
				apptCheckerLog.Error("Exception while drawin specialties: " + ex.Message + "\n" + ex.StackTrace);
				MessageBox.Show($"Error while processing specialties.");
				Environment.Exit(1);
			}
		}

		/// <summary>
		/// Filters the Offices with text entered in Serach box 
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e"></param>
		private void searchBox_TextChanged(object sender, EventArgs e)
{
    try
    {
        // Unsubscribe from the event to prevent it from firing during item updates
        comboBoxOffice.SelectedIndexChanged -= comboBoxOffice_SelectedIndexChanged;
        
        // Clear existing items
        comboBoxOffice.Items.Clear();
        ComboBox filteredOffices = new ComboBox();
        
        // Populate a temporary list with matching offices
        foreach (var office in this.officeDetails)
        {
            string currentOffice = office.Key.ToLower();
            string typedText = searchBox.Text.ToLower();

            if (currentOffice.Contains(typedText) || String.IsNullOrWhiteSpace(typedText))
            {
                filteredOffices.Items.Add(new ComboBoxItem(office.Key, office.Value.officeColor, office.Value.officeTextColor));
            }
        }

        // Clear previous items (if any) and add the filtered results
        if (filteredOffices.Items.Count > 0)
        {
            foreach (ComboBoxItem officeItem in filteredOffices.Items)
            {
                comboBoxOffice.Items.Add(officeItem);
            }
            // Optionally, you could set a default selection here:
            // comboBoxOffice.SelectedIndex = 0;
        }
        else
        {
            apptCheckerLog.Info("Invalid office name - no matches found.");
            comboBoxOffice.SelectedIndex = -1; // Ensure there's no selection when no items match
            comboBoxOffice.DroppedDown = false;
        }
        comboBoxOffice.Cursor = Cursors.Default;
    }
    catch(Exception ex)
    {
        apptCheckerLog.Error("Exception while changing text: " + ex.Message + "\n" + ex.StackTrace);
    }
    finally
    {
        // Re-subscribe to the event (ensure you are not duplicating subscriptions)
        comboBoxOffice.SelectedIndexChanged -= comboBoxOffice_SelectedIndexChanged;
        comboBoxOffice.SelectedIndexChanged += comboBoxOffice_SelectedIndexChanged;
    }
}

				// Re-subscribe after updates
				comboBoxOffice.SelectedIndexChanged += comboBoxOffice_SelectedIndexChanged;
			}
		}
	}
}
